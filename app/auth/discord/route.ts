import {generateState} from "arctic";
import {discord} from "@server/lucia";
import {cookies} from "next/headers";
import {NextRequest, NextResponse} from "next/server";

export async function GET(request: NextRequest) {
    const searchParams = request.nextUrl.searchParams
    const name = searchParams.get("name");
    const cookiesStore = await cookies()

    if (!name) {
        return NextResponse.redirect(`${request.nextUrl.origin}/auth`)
    }

    const state = generateState();
    const url = await discord.createAuthorizationURL(state, {
        scopes: ["identify", "email", "guilds", "guilds.join", "guilds.members.read"],
    });

    cookiesStore.set("discord_oauth_state", state, {
        path: "/",
        secure: process.env.NODE_ENV === "production",
        httpOnly: true,
        maxAge: 60 * 60,
        sameSite: "lax"
    });

    cookiesStore.set("name", name, {
        path: "/",
        secure: process.env.NODE_ENV === "production",
        httpOnly: true,
        maxAge: 60 * 60,
        sameSite: "lax"
    })

    return NextResponse.redirect(url)
}