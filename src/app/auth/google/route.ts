import {generateState, generateCodeVerifier} from "arctic";
import {google} from "@server/lucia";
import {cookies} from "next/headers";

export async function GET() {
	const state = generateState();
	const codeVerifier = generateCodeVerifier();
	const url = await google.createAuthorizationURL(state, codeVerifier, {
		scopes: ["profile", "email"],
	});

	cookies().set("google_oauth_state", state, {
		path: "/",
		secure: process.env.NODE_ENV === "production",
		httpOnly: true,
		maxAge: 60 * 60,
		sameSite: "lax"
	});
	cookies().set("google_oauth_code_verifier", codeVerifier, {
		path: "/",
		secure: process.env.NODE_ENV === "production",
		httpOnly: true,
		maxAge: 60 * 60,
		sameSite: "lax"
	});

	return Response.redirect(url)
}