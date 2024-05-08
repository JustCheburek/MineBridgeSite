import {google, lucia} from "@server/lucia";
import {cookies} from "next/headers";
import {generateId, User} from "lucia";
import type {GUser} from "@/types/user";
import {OAuth2RequestError} from "arctic";
import {caseModel, dropModel, userModel} from "@server/models";
import {NextRequest, NextResponse} from "next/server";
import {validate} from "@services/validate";
import axios from "axios";
import {CasePurchase} from "@/types/purchase";
import {RarityType} from "@/types/case";

// import {AddInvite} from "../../addInvite";


export async function GET(request: NextRequest) {
	const url = request.nextUrl
	const code = url.searchParams.get("code");
	const state = url.searchParams.get("state");
	const codeVerifier = cookies().get("google_oauth_code_verifier")?.value ?? null;
	const storedState = cookies().get("google_oauth_state")?.value ?? null;
	const storedCodeVerifier = cookies().get("google_oauth_code_verifier")?.value ?? null;

	if (!code || !state || !storedState || state !== storedState || codeVerifier !== storedCodeVerifier) {
		return new NextResponse(
				"Неправильный код",
				{
					status: 400
				}
		)
	}

	try {
		const tokens = await google.validateAuthorizationCode(code!, codeVerifier!);
		const gUser = await axios.get<GUser>("https://openidconnect.googleapis.com/v1/userinfo", {
			headers: {
				Authorization: `Bearer ${tokens.accessToken}`
			}
		}).then(r => r.data);

		if (!gUser.email || !gUser.email_verified) {
			return new NextResponse("Нету почты", {status: 400})
		}

		const id = generateId(15)
		const name = cookies().get("name")?.value || gUser.given_name || gUser.name
		/*const place = cookies().get("place")?.value
		const userId = await AddInvite(id, name, cookies().get("from")?.value)*/
		const userData = {
			_id: id,
			name,
			googleId: gUser.sub,
			email: gUser.email,
			photo: gUser.picture,
			/*from: {
				place,
				userId
			}*/
		} as User

		const {user} = await validate()

		if (user) {
			await userModel.findByIdAndUpdate(
					user._id,
					{
						email: userData.email,
						googleId: userData.googleId
					}
			)
		} else {
			let candidate = await userModel.findOneAndUpdate(
					{
						$or: [
							{googleId: userData.googleId},
							{googleId: Number(userData.googleId)},
							{email: userData.email}
						]
					},
					{
						email: userData.email,
						googleId: userData.googleId,
					},
					{
						new: true
					}
			)

			if (candidate) {
				if (candidate._id.length > 15) {
					console.log(`Старый пользователь: ${userData.name}`)
					userData.punishments = candidate.punishments
					userData.mostiki = candidate.mostiki
					userData.rating = candidate.rating

					const casesPurchases = [] as CasePurchase[]

					candidate.casesPurchases.map(async purchase => {
						// @ts-ignore
						const Case = await caseModel.findOne({name: purchase.caseRarity.name})
						// @ts-ignore
						const Drop = await dropModel.findOne({name: purchase.caseType.name})
						// @ts-ignore
						const DropItem = await dropModel.findOne({name: purchase.resultType.name})
						if (!Case || !Drop || !DropItem) return console.log("No case or drop or dropItem")
						// @ts-ignore
						const rarity: RarityType = purchase.resultRarity.name

						// Items
						let {drop: items} = Drop
						if (items?.length === 0) {
							items = DropItem[rarity]
						}
						if (items?.length === 0 || !items) return console.log("No items")

						// @ts-ignore
						const Item = items.find(item => item.name === purchase.resultDrop.name)
						if (!Item) return console.log("Not item")

						casesPurchases.push({Case: Case._id, Drop: Drop._id, DropItem: DropItem._id, Item: Item._id, rarity})
					})

					userData.casesPurchases = casesPurchases

					await userModel.findOneAndDelete({
						name: userData.name
					})

					candidate = await userModel.create(userData)
				}
				/*if (!candidate?.from) {
					candidate.from = userData.from
				}
				if (!candidate.from?.place) {
					candidate.from.place = place
				}
				if (!candidate.from?.userId) {
					candidate.from.userId = userId
				}*/
				// await candidate.save()
			} else {
				candidate = await userModel.create(userData)
			}

			const session = await lucia.createSession(candidate?._id || userData._id, {});
			const sessionCookie = lucia.createSessionCookie(session.id);
			cookies().set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes);
		}

		return new NextResponse(`Всё успешно`, {
			status: 302,
			headers: {
				Location: `/user/${userData.name}`
			}
		});
	} catch (e) {
		if (e instanceof OAuth2RequestError && e.message === "bad_verification_code") {
			return new NextResponse(`Ошибка в коде регистрации ${e}`, {
				status: 400
			});
		}
		return new NextResponse(`Ошибка: ${e}`, {
			status: 500
		});
	}
}