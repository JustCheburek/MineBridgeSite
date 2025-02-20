import {Season} from "@/types/season";
import {seasonModel} from "@server/models";
import {revalidateTag} from "next/cache";

export async function createSeason(season: Season) {
    "use server";

    await seasonModel.create({
        number: season.number,
        startAt: new Date(season.startAt),
        endAt: new Date(season.endAt)
    })

    revalidateTag("seasons")
}