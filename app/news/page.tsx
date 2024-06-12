// React
import type {Metadata} from "next";

// Стили
import styles from "./news.module.scss"

// Компоненты
import {SeasonBox} from "./components"
import {PBox, PText, PTitle} from "@components/post";
import {Img, ImgBox} from "@components/img";
import {getSeasons} from "@/services";
import {MDXRemote} from 'next-mdx-remote/rsc'
import {NotFound} from "@components/notFound";
import {CheckLink} from "@components/checkLink";
import {Form, FormInput, FormLabel, FormTextarea} from "@components/form";
import React from "react";
import {validate} from "@services/validate";
import {cookies} from "next/headers";
import {lucia} from "@server/lucia";

export const metadata: Metadata = {
	title: "Новости | Майнбридж",
	description: "Важнейшие новости, избираемые из телеграма майнбриджа. Здесь интересно!",
};

export default async function News() {
	const {isAdmin} = await validate(cookies().get(lucia.sessionCookieName)?.value)
	const seasons = await getSeasons()

	return (
			<div className="news_content">
				<h1>Новости</h1>

				{seasons.map(season => <div key={season.number}>
					<SeasonBox
							number={season.number}
							startAt={new Date(season.startAt)}
							endAt={new Date(season.endAt)}
					/>

					{isAdmin &&
							<Form>
								<FormLabel>
									<FormInput
											name="title"
											placeholder="Название"
									/>
								</FormLabel>

								<FormLabel>
									<FormTextarea
											name="text"
											placeholder="Текст с markdown"
									/>
								</FormLabel>
							</Form>
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