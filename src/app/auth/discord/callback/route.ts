import {discord, lucia} from "@server/lucia";
import {cookies} from "next/headers";
import {generateId, User} from "lucia";
import type {DSUser, GuildDSUser} from "@src/types/user";
import {userModel} from "@server/models";
import {NextRequest} from "next/server";
import {validate} from "@server/validate";
import axios from "axios";
import {OAuth2RequestError} from "arctic";


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
		// Получение пользователя
		const tokens = await discord.validateAuthorizationCode(code);
		const dsUser = await axios.get<DSUser>("https://discord.com/api/users/@me", {
			headers: {
				Authorization: `Bearer ${tokens.accessToken}`
			}
		}).then(r => r.data);

		if (!dsUser.email || !dsUser.verified) {
			return new Response("Нету почты", {status: 400})
		}

		// Добавление в гильдию
		await axios.put(
				`https://discord.com/api/guilds/${process.env.DISCORD_GUILD_ID}/members/${dsUser.id}`,
				{
					access_token: tokens.accessToken
				},
				{
					headers: {
						Authorization: `Bot ${process.env.DISCORD_TOKEN}`
					}
				}
		).catch(console.error)

		// Получение пользователя и смена ника
		const guildMember = await axios.patch<GuildDSUser | null>(
				`https://discord.com/api/guilds/${process.env.DISCORD_GUILD_ID}/members/${dsUser.id}`,
				{
					nick: dsUser.username
				},
				{
					headers: {
						Authorization: `Bot ${process.env.DISCORD_TOKEN}`
					}
				}
		).then(r => r.data).catch(console.error)

		// Добавление роли
		if (!guildMember?.roles?.includes(process.env.DISCORD_GAMER_ROLE_ID!)) {
			console.log(`Добавление роли ${dsUser.username}`)
			await axios.put(
					`https://discord.com/api/guilds/${process.env.DISCORD_GUILD_ID}/members/${dsUser.id}/roles/${process.env.DISCORD_GAMER_ROLE_ID}`,
					{},
					{
						headers: {
							Authorization: `Bot ${process.env.DISCORD_TOKEN}`
						}
					}
			).catch(console.error)
		}

		const {user} = await validate()

		if (user) {
			await userModel.findByIdAndUpdate(user._id, {email: dsUser.email, discordId: dsUser.id})

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

		const userData = {
			_id: generateId(15),
			name: cookies().get("name")?.value || dsUser.username,
			discordId: dsUser.id,
			email: dsUser.email,
			photo: `https://cdn.discordapp.com/avatars/${dsUser.id}/${dsUser.avatar}.png`
		} as User

		if (guildMember?.joined_at) {
			userData.updatedAt = userData.createdAt = guildMember.joined_at
		}

		if (guildMember?.roles) {
			console.log(guildMember.roles)
		}

		await userModel.create(userData)
		const session = await lucia.createSession(userData._id, {});
		const sessionCookie = lucia.createSessionCookie(session.id);
		cookies().set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes);
		return new Response(null, {
			status: 302,
			headers: {
				Location: `/user/${userData.name}`
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