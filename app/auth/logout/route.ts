import {cookies} from "next/headers";
import {lucia} from "@server/lucia";
import {NextResponse} from "next/server";

export async function GET() {
	cookies().delete(lucia.sessionCookieName)

	return new NextResponse(null, {
		status: 302,
		headers: {
			Location: "/"
		}
	})
}