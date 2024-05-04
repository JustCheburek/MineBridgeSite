import {dropModel} from "@server/models";
import {NextResponse} from "next/server";

export async function GET() {
	const types = await dropModel.find().lean()

	if (!types?.length) {
		return new NextResponse("Типы не найдены", {
			status: 404
		})
	}

	return NextResponse.json(types)
}