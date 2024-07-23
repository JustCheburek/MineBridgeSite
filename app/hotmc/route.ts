import {NextRequest, NextResponse} from "next/server";
// import {sha1} from "js-sha1";

export async function POST(request: NextRequest) {
	const res = await request.text()
	console.log(res)

	/*if (!res.nick || !res.time || !res.sign) {
		return new NextResponse(`Не переданы необходимые данные`, {
			status: 422
		});
	}

	if (res.sign !== sha1(res.nick + res.time + process.env.HOTMC_SECRET)) {
		return new NextResponse(`Переданные данные не прошли проверку`, {
			status: 409
		});
	}*/


	return new NextResponse(`ok`, {
		status: 200
	});
}