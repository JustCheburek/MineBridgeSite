import {NextRequest, NextResponse} from 'next/server'

export function middleware(request: NextRequest) {
	const url = request.nextUrl
	const place = url.searchParams.get("place")
	const from = url.searchParams.get("from")

	const responce = NextResponse.next()

	if (from && !responce.cookies.get("from")?.value) {
		console.log(`Новый игрок от ${from}`)

		const week = 60 * 60 * 24 * 7

		responce.cookies.set({
			name: "from",
			value: from,
			path: "/",
			secure: process.env.NODE_ENV === "production",
			httpOnly: true,
			sameSite: "lax",
			maxAge: week
		})
	}

	if (place && !responce.cookies.get("place")?.value) {
		console.log(`Новый игрок из ${place}`)

		const week = 60 * 60 * 24 * 7

		responce.cookies.set({
			name: "place",
			value: place,
			path: "/",
			secure: process.env.NODE_ENV === "production",
			httpOnly: true,
			sameSite: "lax",
			maxAge: week
		})
	}

	url.searchParams.delete("from")
	url.searchParams.delete("place")

	return responce
}