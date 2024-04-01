import {userModel} from "@server/models";
import {NextRequest, NextResponse} from "next/server";

export async function GET(request: NextRequest) {
	const url = request.nextUrl
	const _id = url.searchParams.get("_id")
	const name = url.searchParams.get("name")

	// @ts-ignore
	const user = await userModel.findOne({
		$or: [
			{_id},
			{name}
		]
	});

	if (!user) {
		return new NextResponse("Пользователь не найден", {
			status: 404
		})
	}

	let roles: Role[] | undefined

	if (user.discordId) {
		roles = await userModel.getRoles(user.discordId)
	}

	return NextResponse.json({user, roles})
}