import {NextRequest, NextResponse} from 'next/server'

export function middleware(request: NextRequest) {
	const url = request.nextUrl
	const place = url.searchParams.get("place")
	const userId = url.searchParams.get("userId")

	const responce = NextResponse.next()

	const week = 60 * 60 * 24 * 7

	if (userId && !responce.cookies.get("userId")?.value) {
		console.log(`Новый игрок от ${userId}`)

		responce.cookies.set({
			name: "userId",
			value: userId,
			path: "/",
			secure: process.env.NODE_ENV === "production",
			httpOnly: true,
			sameSite: "lax",
			maxAge: week
		})
	}

	if (place && !responce.cookies.get("place")?.value) {
		console.log(`Новый игрок из ${place}`)

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

	return responce
}