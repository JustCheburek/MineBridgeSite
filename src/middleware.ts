import {NextRequest, NextResponse} from 'next/server'

export function middleware(request: NextRequest) {
	const url = request.nextUrl
	const where = url.searchParams.get("where")

	const responce = NextResponse.next()

	if (where && !responce.cookies.get("where")?.value) {
		console.log(`Новый игрок от ${where}`)

		const week = 60 * 60 * 24 * 7

		responce.cookies.set({
			name: "where",
			value: where,
			path: "/",
			secure: process.env.NODE_ENV === "production",
			httpOnly: true,
			sameSite: "lax",
			maxAge: week
		})

		url.searchParams.delete("where")
	}

	return responce
}