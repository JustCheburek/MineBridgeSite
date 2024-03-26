import {caseModel} from "@server/models";
import {Case} from "@src/types/case";
import {NextRequest, NextResponse} from "next/server";

export async function GET(request: NextRequest) {
	const url = request.nextUrl
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
		return new NextResponse("Редкость не найдена", {
			status: 404
		})
	}

	return NextResponse.json(rarity)
}