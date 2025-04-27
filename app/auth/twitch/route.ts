import {generateState} from "arctic";
import {twitch} from "@server/lucia";
import {cookies} from "next/headers";
import {NextRequest, NextResponse} from "next/server";

export async function GET(request: NextRequest) {
    const searchParams = request.nextUrl.searchParams
    const cookiesStore = await cookies()
    const name = searchParams.get("name");

    if (!name) {
        return NextResponse.redirect(`${request.nextUrl.origin}/auth`)
    }

    const state = generateState();
    const url = twitch.createAuthorizationURL(
		state,
        ["openid", "user:read:email"]
    );

    const response = NextResponse.redirect(url)

    response.cookies.set("twitch_oauth_state", state, {
        path: "/",
        secure: process.env.NODE_ENV === "production",
        httpOnly: true,
        maxAge: 60 * 60,
        sameSite: "lax"
    });

    response.cookies.set("name", name, {
        path: "/",
        secure: process.env.NODE_ENV === "production",
        httpOnly: true,
        maxAge: 60 * 60,
        sameSite: "lax"
    })

    return NextResponse.redirect(url)
}