import {caseModel} from "@server/models";
import {Case} from "@src/types/case";

export async function GET() {
	const rarities = await caseModel.find<Case>()

	if (!rarities?.length) {
		return new Response("Редкости не найдена", {
			status: 404
		})
	}

	return Response.json(rarities)
}