import {generateState} from "arctic";
import {discord} from "@server/lucia";
import {cookies} from "next/headers";
import {NextRequest, NextResponse} from "next/server";

export async function GET(request: NextRequest) {
	const name = request.nextUrl.searchParams.get("name");

	const state = generateState();
	const url = await discord.createAuthorizationURL(state, {
		scopes: ["identify", "email", "guilds", "guilds.join", "guilds.members.read"],
	});

	cookies().set("discord_oauth_state", state, {
		path: "/",
		secure: process.env.NODE_ENV === "production",
		httpOnly: true,
		maxAge: 60 * 60,
		sameSite: "lax"
	});

	if (name) {
		cookies().set("name", name, {
			path: "/",
			secure: process.env.NODE_ENV === "production",
			httpOnly: true,
			maxAge: 60 * 60,
			sameSite: "lax"
		})
	}

	return NextResponse.redirect(url)
}