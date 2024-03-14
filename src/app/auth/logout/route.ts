import {cookies} from "next/headers";
import {lucia} from "@server/lucia";

export async function GET() {
	cookies().delete(lucia.sessionCookieName)

	return new Response(null, {
		status: 302,
		headers: {
			Location: "/"
		}
	})
}