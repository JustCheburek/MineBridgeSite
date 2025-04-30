import {NextRequest, NextResponse} from "next/server";
import {cookies} from "next/headers";

export async function GET(
	_: NextRequest,
	{params}: {
		params: Promise<{name: string, place: string}>
	}
) {
	const cookiesStore = await cookies()
	const {place, name} = await params
	if (cookiesStore.get("from")?.value) {
		return new NextResponse(null, {
			status: 302,
			headers: {
				Location: "/"
			}
		})
	}

	const week = 60 * 60 * 24 * 7

	console.log(`Новый игрок из ${place.toLowerCase()} от ${name}`)

	cookiesStore.set({
		name: "from",
		value: JSON.stringify({name, place: place.toLowerCase()}),
		path: "/",
		secure: process.env.NODE_ENV === "production",
		httpOnly: true,
		sameSite: "lax",
		maxAge: week
	})

	return new NextResponse(null, {
		status: 302,
		headers: {
			Location: "/"
		}
	})
}