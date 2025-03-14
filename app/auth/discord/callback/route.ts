import {discord, lucia} from "@server/lucia";
import {cookies} from "next/headers";
import {generateId, type User} from "lucia";
import type {DSUser, GuildDSUser} from "@/types/user";
import {userModel} from "@server/models";
import {NextRequest, NextResponse} from "next/server";
import {validate} from "@services/validate";
import axios from "axios";
import {OAuth2RequestError} from "arctic";
import {DS_URL} from "@/const";

export async function GET(request: NextRequest) {
    const {searchParams} = request.nextUrl
    const code = searchParams.get("code");
    const state = searchParams.get("state");
    const cookiesStore = await cookies()

    const storedState = cookiesStore.get("discord_oauth_state")?.value
    const codeVerifier = cookiesStore.get("discord_oauth_code_verifier")?.value

    if (!code || !state || !storedState || !codeVerifier || state !== storedState) {
        return new NextResponse(
            "Неправильный код",
            {
                status: 400
            }
        )
    }

    try {
        // Получение пользователя
        const tokens = await discord.validateAuthorizationCode(code, codeVerifier);
        const accessToken = tokens.accessToken();
        const dsUser = await axios.get<DSUser>("https://discord.com/api/users/@me", {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        }).then(r => r.data).catch(console.error);

        if (!dsUser || !dsUser.email || !dsUser.verified) {
            return new NextResponse("Что-то пошло не так", {status: 400})
        }

        // Добавление в гильдию
        await axios.put(
            `https://discord.com/api/guilds/${process.env.DISCORD_GUILD_ID}/members/${dsUser.id}`,
            {
                access_token: accessToken,
                nick: cookiesStore.get("name")?.value
            },
            {
                headers: {
                    Authorization: `Bot ${process.env.DISCORD_TOKEN}`
                }
            }
        ).catch(console.error)

        // Получение пользователя
        const guildMember = await axios.get<GuildDSUser | null>(
            `https://discord.com/api/guilds/${process.env.DISCORD_GUILD_ID}/members/${dsUser.id}`,
            {
                headers: {
                    Authorization: `Bot ${process.env.DISCORD_TOKEN}`
                }
            }
        ).then(r => r.data).catch(console.error)

        if (!guildMember) {
            return new NextResponse(`Пожалуйста, присоединитесь к дс группе майнбриджа и попробуйте ещё раз! ${DS_URL}`, {
                status: 400
            });
        }

        // Изменение ника
        if (!guildMember?.nick) {
            await axios.patch(
                `https://discord.com/api/guilds/${process.env.DISCORD_GUILD_ID}/members/${dsUser.id}`,
                {
                    nick: cookiesStore.get("name")?.value
                },
                {
                    headers: {
                        Authorization: `Bot ${process.env.DISCORD_TOKEN}`
                    }
                }
            ).catch(console.error)
        }

        // Добавление роли
        if (!guildMember?.roles?.includes(process.env.DISCORD_GAMER_ROLE_ID!)) {
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

        const userData = {
            _id: generateId(15),
            name: cookiesStore.get("name")?.value || dsUser.username,
            discordId: dsUser.id,
            email: dsUser.email,
            photo: dsUser.avatar
                ? `https://cdn.discordapp.com/avatars/${dsUser.id}/${dsUser.avatar}.png`
                : `https://cdn.discordapp.com/embed/avatars/${(BigInt(dsUser.id) >> 22n) % 6n}.png`,
        } as User

        const {user} = await validate()

        if (user) {
            await userModel.findByIdAndUpdate(
                user._id,
                {
                    email: userData.email,
                    discordId: userData.discordId
                }
            )
        } else {
            let candidate = await userModel.findOneAndUpdate(
                {
                    $or: [
                        {discordId: userData.discordId},
                        {discordId: Number(userData.discordId)},
                        {email: userData.email}
                    ]
                },
                {
                    email: userData.email,
                    discordId: userData.discordId,
                },
                {
                    new: true
                }
            )

            if (!candidate) {
                candidate = await userModel.create(userData)
            }

            const session = await lucia.createSession(candidate?._id || userData._id, {});
            const sessionCookie = lucia.createSessionCookie(session.id);
            cookiesStore.set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes);
        }

        return new NextResponse(
            `Всё успешно`,
            {
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