import {twitch, lucia} from "@server/lucia";
import {cookies} from "next/headers";
import {generateId, User} from "lucia";
import type {DataTw} from "@/types/user";
import {OAuth2RequestError} from "arctic";
import {userModel} from "@server/models";
import {NextRequest, NextResponse} from "next/server";
import {validate} from "@services/validate";
import axios from "axios";


export async function GET(request: NextRequest) {
    const {searchParams} = request.nextUrl
    const code = searchParams.get("code");
    const state = searchParams.get("state");
    const cookiesStore = await cookies()

    const storedState = cookiesStore.get("twitch_oauth_state")?.value

    if (!code || !state || !storedState || state !== storedState ) {
        return new NextResponse(
            "Неправильный код",
            {
                status: 400
            }
        )
    }

    try {
        // Получение пользователя
        const tokens = await twitch.validateAuthorizationCode(code);
        const accessToken = tokens.accessToken();
        const dataTw = await axios.get<DataTw>("https://api.twitch.tv/helix/users", {
            headers: {
                Authorization: `Bearer ${accessToken}`,
                "Client-Id": process.env.TWITCH_CLIENT_ID!
            }
        }).then(r => r.data).catch(console.error);

        if (!dataTw) {
            return new NextResponse("Пользователь не найден", {status: 400})
        }

        const twUser = dataTw.data[0]
        if (!twUser || !twUser.email) {
            return new NextResponse("Верифицируйте почту", {status: 400})
        }

        const userData = {
            _id: generateId(15),
            name: cookiesStore.get("name")?.value || twUser.login,
            twitchId: twUser.id,
            email: twUser.email,
            photo: twUser.profile_image_url,
            socials: [{
                social: "twitch",
                name: twUser.login
            }]
        } as User

        const {user} = await validate()

        if (user) {
            await userModel.findByIdAndUpdate(
                user._id,
                {
                    email: userData.email,
                    twitchId: userData.twitchId,
                    $set: {
                        socials: userData.socials[0]
                    }
                }
            )
        } else {
            let candidate = await userModel.findOneAndUpdate(
                {
                    $or: [
                        {twitchId: userData.twitchId},
                        {email: userData.email}
                    ]
                },
                {
                    email: userData.email,
                    twitchId: userData.twitchId,
                    $set: {
                        socials: userData.socials[0]
                    }
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