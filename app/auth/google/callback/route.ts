import {google, lucia} from "@server/lucia";
import {cookies} from "next/headers";
import {generateId, type User} from "lucia";
import type {GUser} from "@/types/user";
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

    const storedState = cookiesStore.get("google_oauth_state")?.value
    const codeVerifier = cookiesStore.get("google_oauth_code_verifier")?.value

    if (!code || !state || !storedState || !codeVerifier || state !== storedState ) {
        return new NextResponse(
            "Неправильный код",
            {
                status: 400
            }
        )
    }

    try {
        // Получение пользователя
        const tokens = await google.validateAuthorizationCode(code, codeVerifier);
        const accessToken = tokens.accessToken();
        const gUser = await axios.get<GUser>("https://openidconnect.googleapis.com/v1/userinfo", {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        }).then(r => r.data).catch(console.error);

        if (!gUser || !gUser.email || !gUser.email_verified) {
            return new NextResponse("Верифицируйте почту", {status: 400})
        }

        const userData = {
            _id: generateId(15),
            name: cookiesStore.get("name")?.value,
            googleId: gUser.sub,
            email: gUser.email,
            photo: gUser.picture
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