import {generateState} from "arctic";
import {discord} from "@server/lucia";
import {cookies} from "next/headers";

export async function GET() {
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

	return Response.redirect(url)
}