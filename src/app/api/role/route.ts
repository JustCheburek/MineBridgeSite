import {roleModel} from "@server/models";
import {Role} from "@src/types/role";
import {NextRequest} from "next/server";

export async function GET(request: NextRequest) {
	const url = new URL(request.url)
	const _id = url.searchParams.get("_id");
	const name = url.searchParams.get("name");
	const displayname = url.searchParams.get("displayname");

	const role = await roleModel.findOne<Role>({
		$or: [
			{_id},
			{name},
			{displayname}
		]
	})

	if (!role) {
		return new Response("Роль не найдена", {
			status: 404
		})
	}

	return Response.json(role)
}