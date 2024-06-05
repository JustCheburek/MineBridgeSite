import {generateCodeVerifier, generateState} from "arctic";
import {google} from "@server/lucia";
import {cookies} from "next/headers";
import {NextRequest, NextResponse} from "next/server";

export async function GET(request: NextRequest) {
	const name = request.nextUrl.searchParams.get("name");

	if (!name) {
		return NextResponse.redirect("/auth")
	}

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

	cookies().set("name", name, {
		path: "/",
		secure: process.env.NODE_ENV === "production",
		httpOnly: true,
		maxAge: 60 * 60,
		sameSite: "lax"
	})

	return NextResponse.redirect(url)
}