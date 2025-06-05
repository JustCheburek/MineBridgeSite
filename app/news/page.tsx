import type { Metadata } from "next";
import { revalidateTag } from 'next/cache'
import { H1 } from "@components/h1";
import { SeasonBox } from "@components/post";
import { NewsInfiniteList } from "./components";
import { getSeasons } from "@/services/seasons";
import { Suspense } from "react";
import { Skeleton } from "@/ui/components/skeleton";

export const revalidate = 3600

export const metadata: Metadata = {
    title: "Новости",
    description: "Важнейшие новости, избираемые из телеграма майнбриджа. Здесь интересно!"
};

export default async function News() {
    const seasons = await getSeasons()

    return (
        <div className="news_content">
            <H1 up reload={async () => {
                "use server";
                revalidateTag("all")
            }}>
                Новости
            </H1>

            {/* {seasons.map(season =>
                <div key={season.number}>
                    <SeasonBox
                        number={season.number}
                        startAt={new Date(season.startAt)}
                        endAt={new Date(season.endAt)}
                    />
                </div>
            )} */}

            <Suspense fallback={<Skeleton width="100%" height="400px" />}>
                <NewsInfiniteList />
            </Suspense>
        </div>
    )
}