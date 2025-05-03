import {NextRequest, NextResponse} from "next/server";
import {sha1} from "js-sha1";
import {userModel} from "@db/models";
import {AUTO} from "@/const";
import {Punishment} from "@/types/punishment";


export async function POST(request: NextRequest) {
    const res = await request.formData()

    const name = res.get("nick") as string | null
    const time = res.get("time") as string | null
    const sign = res.get("sign") as string | null

    if (!name || !time || !sign) {
        return new NextResponse("Не переданы необходимые данные", {
            status: 422
        });
    }

    if (sign !== sha1(name + time + process.env.HOTMC_SECRET)) {
        return new NextResponse("Переданные данные не прошли проверку", {
            status: 409
        });
    }

    const user = await userModel.findOne({name})

    if (!user) {
        return new NextResponse("Игрок не найден", {
            status: 404
        });
    }

    const fullMonitoring = user.punishments?.reduce(
        (accum: number, {rating, author}: Punishment) => {
            if (author !== AUTO.MONITORING) {
                rating = 0
            }

            return accum + rating
        }, 0
    ) + 1
    user.punishments = user.punishments?.filter(({author}: Punishment) => author !== AUTO.MONITORING)
    user.punishments?.push({
        reason: `Голосование: ${fullMonitoring}`,
        rating: fullMonitoring,
        author: AUTO.MONITORING
    })
    user.rating += 1
    await user.save()

    return new NextResponse("ok", {
        status: 200
    });
}