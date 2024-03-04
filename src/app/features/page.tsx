// React
import type {Metadata} from "next";

// Стили
import styles from "./features.module.scss"

// Компоненты
import {BatSvg, TwitchSvg, YtSvg} from "@ui/svgs";
import {MaxSize} from "@components/maxSize";
import {GBox, GContainer, GText} from "@components/grid";
import {Url} from "@components/button";
import {Img, ImgBox} from "@components/img";

export const metadata: Metadata = {
	title: "Фичи | Майнбридж",
	description: "Список всяких полезностей для более комфортной игры. Слишком полезно!",
};

export default function Features() {
	return (
			<main>
				<MaxSize>
					<h1>Фичи</h1>

					<GContainer>
						<GBox href="/features/lor" imgs="one">
							<ImgBox className={styles.img} type="grid">
								<BatSvg/>
							</ImgBox>

							<GText>Лор</GText>
						</GBox>

						<GBox href="/features/crafts" imgs="two">
							<ImgBox className={styles.img} type="grid">
								<Img src="/media/features/crafts/light.png" alt="Свет" pixel/>
							</ImgBox>
							<ImgBox className={styles.img} type="grid">
								<Img src="/media/features/crafts/dragon_breath.webp" alt="Драконье дыхание" pixel/>
							</ImgBox>

							<GText>Крафты</GText>
						</GBox>


						<GBox href="/features/guides" imgs="two">
							<ImgBox className={styles.img} type="grid">
								<Img src="/media/features/guides/thinking.png" alt="Думающий чел"/>
							</ImgBox>
							<ImgBox className={styles.img} type="grid">
								<Img src="/media/features/guides/blocks.png" alt="Блоки"/>
							</ImgBox>

							<GText>Гайды</GText>
						</GBox>

						<GBox href="/rules/mods" imgs="two">
							<ImgBox className={styles.img} type="grid">
								<Img src="/media/features/mods/replay_mod.png" alt="Реплей мод"/>
							</ImgBox>
							<ImgBox className={styles.img} type="grid">
								<Img src="/media/features/mods/voice_chat.png" alt="Войс чат"/>
							</ImgBox>

							<GText>Моды</GText>
						</GBox>

						<GBox
								href="http://map.minebridge.site" anotherSite
								imgs="one"
						>
							<ImgBox className={styles.img} type="grid">
								<Img src="/media/features/map.png" alt="Карта"/>
							</ImgBox>

							<GText>Карта</GText>
						</GBox>

						<GBox href="/features/streamers" className={styles.streamers} imgs="two">
							<ImgBox className={styles.img} type="grid" width="43%">
								<TwitchSvg className="color"/>
							</ImgBox>
							<ImgBox className={styles.img} type="grid" width="43%">
								<YtSvg className="color"/>
							</ImgBox>

							<GText>Контент мейкеры</GText>
						</GBox>

						<GBox href="/features/stickers" imgs="three">
							<ImgBox className={styles.img} type="grid">
								<Img src="/media/features/stickers/10.png" alt="Стикер"/>
							</ImgBox>
							<ImgBox className={styles.img} type="grid">
								<Img src="/media/features/stickers/0.png" alt="Стикер"/>
							</ImgBox>
							<ImgBox className={styles.img} type="grid">
								<Img src="/media/features/stickers/8.png" alt="Стикер"/>
							</ImgBox>

							<GText>Стикеры</GText>
						</GBox>

						<GBox href="/features/totems" imgs="three">
							<ImgBox className={styles.img} type="grid">
								<Img src="/media/features/totems/kawa11fox.png" alt="Тотем" pixel/>
							</ImgBox>
							<ImgBox className={styles.img} type="grid">
								<Img src="/media/features/totems/justcheburek.png" alt="Тотем" pixel/>
							</ImgBox>
							<ImgBox className={styles.img} type="grid">
								<Img src="/media/features/totems/kaharirn.png" alt="Тотемы" pixel/>
							</ImgBox>

							<GText>Тотемы</GText>
						</GBox>

						<GBox anotherSite>
							<ul className={`not_indent remove_marker ${styles.vote_box}`}>
								<li>
									<Url href="https://minecraftrating.ru/server/minebridge" margin="inherit">
										1
									</Url>
								</li>
								<li>
									<Url href="https://hotmc.ru/minecraft-server-259948" margin="inherit">
										2
									</Url>
								</li>
							</ul>

							<GText>Голосование</GText>
						</GBox>

						{/*
                    <a href="/features/totems" className="plugins box">
                        <ImgBox src="/media/features" alt="Плагины" className={styles.img}>

                        <GText>Плагины</GText>
                    </a>
                    */}
					</GContainer>
				</MaxSize>
			</main>
	)
}