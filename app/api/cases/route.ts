import {caseModel} from "@server/models";
import {NextResponse} from "next/server";

export async function GET() {
	const rarities = await caseModel.find()

	if (!rarities?.length) {
		return new NextResponse("Редкости не найдена", {
			status: 404
		})
	}

	return NextResponse.json(rarities)
}