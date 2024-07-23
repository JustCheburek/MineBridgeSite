import {NextRequest, NextResponse} from "next/server";
import {sha1} from "js-sha1";
import {userModel} from "@server/models";

export async function POST(request: NextRequest) {
	const res = await request.formData()

	const nick = res.get("nick") as string | null
	const time = res.get("time") as string | null
	const sign = res.get("sign") as string | null

	if (!nick || !time || !sign) {
		return new NextResponse("Не переданы необходимые данные", {
			status: 422
		});
	}

	if (sign !== sha1(nick + time + process.env.HOTMC_SECRET)) {
		return new NextResponse("Переданные данные не прошли проверку", {
			status: 409
		});
	}

	await userModel.findOneAndUpdate(
			{nick},
			{
				$inc: {
					mostiki: 2
				}
			}
	)

	return new NextResponse("ok", {
		status: 200
	});
}