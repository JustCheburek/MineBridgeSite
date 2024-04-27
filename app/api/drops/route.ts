import {dropModel} from "@server/models";
import {Drop} from "@/types/case";
import {NextResponse} from "next/server";

export async function GET() {
	const types = await dropModel.find<Drop>()

	if (!types?.length) {
		return new NextResponse("Типы не найдены", {
			status: 404
		})
	}

	return NextResponse.json(types)
}