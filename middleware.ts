import {NextRequest, NextResponse} from 'next/server'

export async function middleware(request: NextRequest) {
	const {searchParams} = request.nextUrl
	const place = searchParams.get("place")
	const userId = searchParams.get("userId")

	const responce = NextResponse.next()

	if (!place || !userId || responce.cookies.get("from")?.value) {
		return responce
	}

	const week = 60 * 60 * 24 * 7

	console.log(`Новый игрок из ${place} от ${userId}`)

	responce.cookies.set({
		name: "from",
		value: JSON.stringify({userId, place}),
		path: "/",
		secure: process.env.NODE_ENV === "production",
		httpOnly: true,
		sameSite: "lax",
		maxAge: week
	})

	return responce
}