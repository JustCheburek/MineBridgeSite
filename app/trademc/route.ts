import {NextRequest, NextResponse} from "next/server";
import {getSHA256Hash} from "boring-webcrypto-sha256";
import type {TradeMC} from "@/types/trademc";

export async function POST(request: NextRequest) {
	const res: TradeMC = await request.json();

	console.log(res);

	if (!res.shop_id || !res.buyer || !res.items || !res.hash) {
		return new NextResponse(`Не переданы необходимые данные`, {
			status: 422
		});
	}

	if (res.hash !== await getSHA256Hash(JSON.stringify(res) + process.env.TRADEMC_SECRET)) {
		return new NextResponse(`Переданные данные не прошли проверку`, {
			status: 409
		});
	}

	console.log(`Всё ок ${res.buyer} получает мостики`)

	return new NextResponse(`ok`, {
		status: 200
	});
}