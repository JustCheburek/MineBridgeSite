import {dropModel} from "@server/models";
import {NextRequest} from "next/server";
import {Drop} from "@src/types/case";

export async function GET(request: NextRequest) {
	const url = new URL(request.url)
	const _id = url.searchParams.get("_id");
	const name = url.searchParams.get("name");
	const displayname = url.searchParams.get("displayname");
	const description = url.searchParams.get("description");
	const price = url.searchParams.get("price");

	const rarity = await dropModel.findOne<Drop>({
		$or: [
			{_id},
			{name},
			{displayname},
			{description},
			{price}
		]
	})

	if (!rarity) {
		return new Response("Тип не найден", {
			status: 404
		})
	}

	return Response.json(rarity)
}