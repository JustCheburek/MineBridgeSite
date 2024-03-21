import {dropModel} from "@server/models";
import {Drop} from "@src/types/case";

export async function GET() {
	const types = await dropModel.find<Drop>()

	if (!types?.length) {
		return new Response("Типы не найдены", {
			status: 404
		})
	}

	return Response.json(types)
}