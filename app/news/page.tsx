// React
import type {Metadata} from "next";
import {revalidateTag} from "next/cache";

// Стили
import styles from "./news.module.scss"

// Компоненты
import {SeasonBox} from "./components"
import {OnThisPage, OnThisPageItem} from "@components/sideNav";
import {PBox, PText, PTitle} from "@components/post";
import {Img, ImgBox} from "@components/img";
import {getSeasons} from "@/services";
import {MDXRemote} from 'next-mdx-remote/rsc'
import {NotFound} from "@components/notFound";
import {CheckLink} from "@components/checkLink";

export const metadata: Metadata = {
	title: "Новости | Майнбридж",
	description: "Важнейшие новости, избираемые из телеграма майнбриджа. Здесь интересно!",
};

export default async function News() {
	revalidateTag("seasons")
	const seasons = await getSeasons()

	return (<>
		<div className="news_content" key="news_content">
			<h1>Новости</h1>

			{seasons.map(season => (<>
				<SeasonBox
						key={season.number}
						number={season.number}
						startAt={new Date(season.startAt)}
						endAt={new Date(season.endAt)}
				/>
				{season.news.map(news => {
					return (
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
				})
				}
			</>))}

			<NotFound buttonText="Телеграм" href="https://t.me/MineBridgeOfficial">
				Если вы всё равно не нашли новость, можете перейти в телеграм канал и поискать там!
			</NotFound>
		</div>

		<OnThisPage>
			<OnThisPageItem>
				Сезоны
			</OnThisPageItem>
			<OnThisPageItem href="#5season">
				5 сезон
			</OnThisPageItem>
			<OnThisPageItem href="#4season">
				4 сезон
			</OnThisPageItem>
			<OnThisPageItem href="#3season">
				3 сезон
			</OnThisPageItem>
			<OnThisPageItem href="#2season">
				2 сезон
			</OnThisPageItem>
			<OnThisPageItem href="#1season">
				1 сезон
			</OnThisPageItem>
		</OnThisPage>
	</>)
}