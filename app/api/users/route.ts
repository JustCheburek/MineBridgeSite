import {userModel} from "@server/models";
import {NextRequest, NextResponse} from "next/server";

export async function GET(request: NextRequest) {
	const url = request.nextUrl
	const roles = url.searchParams.get("roles");
	const whitelist = url.searchParams.get("whitelist");

	let filter = {}

	if (roles || whitelist) {
		filter = {
			$or: [
				{roles},
				{whitelist}
			]
		}
	}

	const users = await userModel.find(filter).lean();

	if (!users?.length) {
		return new NextResponse("Пользователи не найдены", {
			status: 404
		})
	}

	return NextResponse.json(users)
}