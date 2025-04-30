import {generateCodeVerifier, generateState} from "arctic";
import {discord} from "@db/lucia";
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
    const codeVerifier = generateCodeVerifier();
    const url = discord.createAuthorizationURL(
        state, codeVerifier,
        ["identify", "email", "guilds", "guilds.join", "guilds.members.read"],
    );

    const response = NextResponse.redirect(url)

    response.cookies.set("discord_oauth_state", state, {
        path: "/",
        secure: process.env.NODE_ENV === "production",
        httpOnly: true,
        maxAge: 60 * 60,
        sameSite: "lax"
    });
    response.cookies.set("discord_oauth_code_verifier", codeVerifier, {
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

    return response
}