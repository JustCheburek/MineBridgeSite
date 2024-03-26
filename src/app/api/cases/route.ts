import {caseModel} from "@server/models";
import {Case} from "@src/types/case";
import {NextResponse} from "next/server";

export async function GET() {
	const rarities = await caseModel.find<Case>()

	if (!rarities?.length) {
		return new NextResponse("Редкости не найдена", {
			status: 404
		})
	}

	return NextResponse.json(rarities)
}