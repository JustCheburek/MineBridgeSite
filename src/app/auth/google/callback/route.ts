import {google, lucia} from "@server/lucia";
import {cookies} from "next/headers";
import {generateId} from "lucia";
import type {GUser} from "@src/types/user";
import {OAuth2RequestError} from "arctic";
import {userModel} from "@server/models";
import {NextRequest, NextResponse} from "next/server";
import {validate} from "@server/validate";
import axios from "axios";

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

		const {user} = await validate()

		if (user) {
			await userModel.findByIdAndUpdate(user._id,{email: gUser.email, discordId: gUser.sub})

			return new NextResponse(null, {
				status: 302,
				headers: {
					Location: `/user/${user.name}`
				}
			});
		}

		const candidate = await userModel.findOne({
			$or: [
				{googleId: gUser.sub},
				{email: gUser.email}
			]
		})

		if (candidate) {
			candidate.email = gUser.email
			candidate.googleId = gUser.sub
			await candidate.save()

			const session = await lucia.createSession(candidate._id, {});
			const sessionCookie = lucia.createSessionCookie(session.id);
			cookies().set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes);
			return new NextResponse(null, {
				status: 302,
				headers: {
					Location: `/user/${candidate.name}`
				}
			});
		}

		const userId = generateId(15);
		const name = cookies().get("name")?.value || gUser.given_name || gUser.name
		await userModel.create({
			_id: userId,
			name,
			googleId: gUser.sub,
			email: gUser.email,
			photo: gUser.picture
		})
		const session = await lucia.createSession(userId, {});
		const sessionCookie = lucia.createSessionCookie(session.id);
		cookies().set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes);
		return new NextResponse(null, {
			status: 302,
			headers: {
				Location: `/user/${name}`
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