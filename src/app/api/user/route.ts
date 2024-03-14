import {userModel} from "@server/models";
import type {User} from "lucia";
import {NextRequest} from "next/server";

export async function GET(request: NextRequest) {
	const url = new URL(request.url)
	const _id = url.searchParams.get("_id");
	const name = url.searchParams.get("name");
	const googleId = url.searchParams.get("googleId");
	const discordId = url.searchParams.get("discordId");

	const user = await userModel.findOne<User>({
		$or: [
			{_id},
			{name},
			{googleId},
			{discordId}
		]
	});

	if (!user) {
		return new Response("Пользователь не найден", {
			status: 404
		})
	}

	return Response.json(user)
}