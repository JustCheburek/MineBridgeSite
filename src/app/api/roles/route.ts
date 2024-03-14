import {roleModel} from "@server/models";
import {Role} from "@src/types/role";

export async function GET() {
	const roles = await roleModel.find<Role>();

	if (!roles) {
		return new Response("Роли не найдены", {
			status: 404
		})
	}

	return Response.json(roles)
}