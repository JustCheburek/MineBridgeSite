import {caseModel} from "@server/models";
import {Case} from "@src/types/case";
import {NextRequest} from "next/server";

export async function GET(request: NextRequest) {
	const url = new URL(request.url)
	const _id = url.searchParams.get("_id");
	const name = url.searchParams.get("name");
	const displayname = url.searchParams.get("displayname");
	const price = url.searchParams.get("price");

	const rarity = await caseModel.findOne<Case>({
		$or: [
			{_id},
			{name},
			{displayname},
			{price}
		]
	})

	if (!rarity) {
		return new Response("Редкость не найдена", {
			status: 404
		})
	}

	return Response.json(rarity)
}