// React
import type {Metadata} from "next";
import {lucia} from "@server/lucia";
import {validate} from "@services/validate";
import {cookies} from "next/headers";
import {getSeasons} from "@/services";
import {MDXRemote} from 'next-mdx-remote/rsc'
import {seasonModel} from "@server/models";

// Стили
import styles from "./news.module.scss"

// Типы
import {Season} from "@/types/season";

// Компоненты
import {SeasonBox} from "./components"
import {PBox, PText, PTitle} from "@components/post";
import {Img, ImgBox} from "@components/img";
import {NotFound} from "@components/notFound";
import {CheckLink} from "@components/checkLink";
import {AddNewForm} from "@app/news/components/addNewForm";
import {revalidateTag} from "next/cache";
import {H1} from "@components/h1";

export const metadata: Metadata = {
    title: "Новости",
    description: "Важнейшие новости, избираемые из телеграма майнбриджа. Здесь интересно!",
    openGraph: {
        title: "Новости",
        description: "Важнейшие новости, избираемые из телеграма майнбриджа. Здесь интересно!",
    },
    twitter: {
        title: "Новости",
        description: "Важнейшие новости, избираемые из телеграма майнбриджа. Здесь интересно!",
    }
};

export default async function News() {
    const {isAdmin} = await validate(cookies().get(lucia.sessionCookieName)?.value)
    const seasons = await getSeasons()

    async function addNew(formData: FormData, number: Season["number"]) {
        "use server";

        await seasonModel.findOneAndUpdate(
            {number},
            {
                $push: {
                    news: Object.fromEntries(formData)
                }
            }
        )

        revalidateTag("seasons")
    }

    return (
        <div className="news_content">
            <H1 up reload={async () => {
                "use server";
                revalidateTag("seasons")
            }}>
                Новости
            </H1>

            {seasons.map(season => <div key={season.number}>
                <SeasonBox
                    number={season.number}
                    startAt={new Date(season.startAt)}
                    endAt={new Date(season.endAt)}
                />

                {isAdmin &&
                  <AddNewForm addNew={addNew} number={season.number}/>
                }

                {season.news.map(news => (
                        <PBox key={news.heading}>
                            {news.image &&
                              <CheckLink
                                href={news.href}
                              >
                                <ImgBox type="post">
                                  <Img src={news.image || ""} alt={news.heading}/>
                                </ImgBox>
                              </CheckLink>
                            }
                            <PTitle startAt={news.startAt} endAt={news.endAt}>
                                <h2>
                                    <CheckLink
                                        href={news.href}
                                    >
                                        {news.heading}
                                    </CheckLink>
                                </h2>
                            </PTitle>
                            {news?.text &&
                              <PText className={styles.text}>
                                <MDXRemote source={news.text}/>
                              </PText>
                            }
                        </PBox>
                    )
                )}
            </div>)}

            <NotFound buttonText="Телеграм" href="https://t.me/MineBridgeOfficial">
                Если вы всё равно не нашли новость, можете перейти в телеграм канал и поискать там!
            </NotFound>
        </div>
    )
}