import {userModel} from "@server/models";
import {User} from "lucia";
import {NextRequest} from "next/server";

export async function GET(request: NextRequest) {
	const url = new URL(request.url)
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

	const users = await userModel.find<User>(filter);

	if (!users?.length) {
		return new Response("Пользователи не найдены", {
			status: 404
		})
	}

	return Response.json(users)
}