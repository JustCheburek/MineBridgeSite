import {google, lucia} from "@server/lucia";
import {cookies} from "next/headers";
import {generateId, User} from "lucia";
import type {GUser} from "@/types/user";
import {OAuth2RequestError} from "arctic";
import {userModel} from "@server/models";
import {NextRequest, NextResponse} from "next/server";
import {validate} from "@server/validate";
import axios from "axios";
import {AddInvite} from "../../addInvite";


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
		const place = cookies().get("place")?.value
		const userId = await AddInvite(id, name, cookies().get("from")?.value)
		const userData = {
			_id: id,
			name,
			googleId: gUser.sub,
			email: gUser.email,
			photo: gUser.picture,
			from: {
				place,
				userId
			}
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
			const candidate = await userModel.findOneAndUpdate(
					{
						$or: [
							{googleId: userData.googleId},
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
				if (!candidate?.from) {
					candidate.from = userData.from
				}
				if (!candidate.from?.place) {
					candidate.from.place = place
				}
				if (!candidate.from?.userId) {
					candidate.from.userId = userId
				}
				await candidate.save()
			} else {
				await userModel.create(userData)
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