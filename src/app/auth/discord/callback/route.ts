import {discord, lucia} from "@server/lucia";
import {cookies} from "next/headers";
import {generateId} from "lucia";
import type {DSUser} from "@src/types/user";
import {OAuth2RequestError} from "arctic";
import {userModel} from "@server/models";
import {NextRequest} from "next/server";
import {validate} from "@server/validate";


export async function GET(request: NextRequest) {
	const url = new URL(request.url);
	const code = url.searchParams.get("code");
	const state = url.searchParams.get("state");
	const storedState = cookies().get("discord_oauth_state")?.value ?? null;
	if (!code || !state || !storedState || state !== storedState) {
		return new Response(
				"Неправильный код",
				{
					status: 400
				}
		)
	}

	try {
		const tokens = await discord.validateAuthorizationCode(code);
		const dsUser: DSUser = await fetch("https://discord.com/api/users/@me", {
			headers: {
				Authorization: `Bearer ${tokens.accessToken}`
			}
		}).then(res => res.json());

		if (!dsUser.email || !dsUser.verified) {
			return new Response("Нету почты", {status: 400})
		}

		const {user} = await validate()

		if (user) {
			await userModel.findByIdAndUpdate(user._id,{email: dsUser.email, discordId: dsUser.id})

			return new Response(null, {
				status: 302,
				headers: {
					Location: `/user/${user.name}`
				}
			});
		}

		const candidate = await userModel.findOne({
			$or: [
				{discordId: dsUser.id},
				{email: dsUser.email}
			]
		})

		if (candidate) {
			candidate.email = dsUser.email
			candidate.discordId = dsUser.id
			await candidate.save()

			const session = await lucia.createSession(candidate._id, {});
			const sessionCookie = lucia.createSessionCookie(session.id);
			cookies().set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes);
			return new Response(null, {
				status: 302,
				headers: {
					Location: `/user/${candidate.name}`
				}
			});
		}

		const userId = generateId(15);
		const name = cookies().get("name")?.value || dsUser.username
		await userModel.create({
			_id: userId,
			name: name,
			discordId: dsUser.id,
			email: dsUser.email,
			photo: `https://cdn.discordapp.com/avatars/${dsUser.id}/${dsUser.avatar}.png`
		})
		const session = await lucia.createSession(userId, {});
		const sessionCookie = lucia.createSessionCookie(session.id);
		cookies().set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes);
		return new Response(null, {
			status: 302,
			headers: {
				Location: `/user/${name}`
			}
		});
	} catch (e) {
		if (e instanceof OAuth2RequestError && e.message === "bad_verification_code") {
			return new Response(`Ошибка в коде регистрации ${e}`, {
				status: 400
			});
		}
		return new Response(`Ошибка: ${e}`, {
			status: 500
		});
	}
}