import {roleModel} from "@server/models";
import {Role} from "@src/types/role";
import {NextResponse} from "next/server";

export async function GET() {
	const roles = await roleModel.find<Role>();

	if (!roles) {
		return new NextResponse("Роли не найдены", {
			status: 404
		})
	}

	return NextResponse.json(roles)
}