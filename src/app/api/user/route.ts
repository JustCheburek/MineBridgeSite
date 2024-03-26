import {userModel} from "@server/models";
import type {User} from "lucia";
import {NextRequest, NextResponse} from "next/server";

export async function GET(request: NextRequest) {
	const url = request.nextUrl
	const _id = url.searchParams.get("_id");
	const name = url.searchParams.get("name");

	const user = await userModel.findOne<User>({
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

	return NextResponse.json(user)
}