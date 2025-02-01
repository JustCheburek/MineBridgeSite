import {vk} from "@server/lucia";
import {cookies} from "next/headers";
import type {VKUser} from "@/types/user";
import {NextRequest, NextResponse} from "next/server";
import axios from "axios";


export async function GET(request: NextRequest) {
    const {searchParams} = request.nextUrl
    const code = searchParams.get("code");
    const state = searchParams.get("state");
    const cookiesStore = await cookies()

    const storedState = cookiesStore.get("vk_oauth_state")?.value

    if (!code || !state || !storedState || state !== storedState) {
        return new NextResponse(
            "Неправильный код",
            {
                status: 400
            }
        )
    }

    /*try {*/
    // Получение пользователя
    const tokens = await vk.validateAuthorizationCode(code);

    console.log(`tokens: ${JSON.stringify(tokens)}`)

    const accessToken = tokens.accessToken();

    console.log(`accessToken: ${accessToken}`)

    const vkUser = await axios.get<VKUser>("https://api.vk.com/method/users.get", {
        headers: {
            Authorization: `Bearer ${accessToken}`
        }
    }).then(r => r.data).catch(console.error);

    console.log(`vkUser: ${JSON.stringify(vkUser)}`)

    /*if (!vkUser || !vkUser.email) {
        return new NextResponse("Проверьте вк аккаунт", {status: 400})
    }



    const userData = {
        _id: generateId(15),
        name: cookiesStore.get("name")?.value,
        vkId: gUser.sub,
        email: gUser.email,
        photo: gUser.picture
    } as User

    const {user} = await validate()

    if (user) {
        await userModel.findByIdAndUpdate(
            user._id,
            {
                email: userData.email,
                vkId: userData.vkId
            }
        )
    } else {
        let candidate = await userModel.findOneAndUpdate(
            {
                $or: [
                    {vkId: userData.vkId},
                    {vkId: Number(userData.vkId)},
                    {email: userData.email}
                ]
            },
            {
                email: userData.email,
                vkId: userData.vkId,
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
    }*/

    return new NextResponse(
        `Всё успешно`,
        {
            /*status: 302,
            headers: {
                Location: `/user/${userData.name}`
            }*/
        });
    /*} catch (e) {
        if (e instanceof OAuth2RequestError && e.message === "bad_verification_code") {
            return new NextResponse(`Ошибка в коде регистрации ${e}`, {
                status: 400
            });
        }
        return new NextResponse(`Ошибка: ${e}`, {
            status: 500
        });
    }*/
}