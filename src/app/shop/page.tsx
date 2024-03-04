// React
import type {Metadata} from "next";
import Image from "next/image";
import Link from "next/link";

// Компоненты
import {Author, Box, Case, CaseButton, CaseInfo, Heading, Price, Section, StickerButton, Text} from "./components";

// Стили
import styles from "./shop.module.scss"

// Скрипты
import {RarityCase} from "./case/db";
import {getSumChances} from "@app/utils";

// Компоненты
import {MostikiSvg} from "@ui/svgs";
import {NavButton} from "@components/button";
import {MaxSize} from "@components/maxSize";
import {Img, ImgBox} from "@components/img";

export const metadata: Metadata = {
	title: "Магазин | Майнбридж",
	description: "Мостики — внутриигровая валюта. 1 ₽ = 1 мостик. Кейсы, стикеры, всё это про нас!",
};


export default function Shop() {
	return (
			<main className={styles.shop}>
				<MaxSize width={1050}>
					<h1>Магазин</h1>

					<div className="grid_center">
						<p>
							На сервере действует внутриигровая валюта <strong className="unic_color">мостики</strong>:
						</p>
						<h3 className="center_text">
							1 ₽ = 1 <MostikiSvg/>
						</h3>
						<NavButton href="./buy">
							Купить
						</NavButton>
						<p>
							Покупка <Link href="#stickers" className="unic_color"><strong>стикеров</strong></Link> {" "}
							происходит только:
						</p>
						<ul>
							<li>
								В дс канале <a
									href="https://discord.gg/7zx8u4rY"
									rel="noreferrer noopener"
									target="_blank"
							>
								<strong className="unic_color">
									#покупка
								</strong>
							</a>
							</li>
							<li>
								У <a
									href="https://t.me/Kawa11Fox"
									target="_blank"
									rel="noreferrer noopener"
							>
								<strong className="unic_color">
									Kawa11Fox
								</strong>
							</a>
							</li>
						</ul>
					</div>

					<Heading heading="Кейсы" href="/case" name="cases">
						<p>
							С помощью кейсов можно кастомизировать свой внешний вид
						</p>
						<p>
							Тип дропа с кейсов можно изменять
						</p>
					</Heading>

					<Section name="cases">
						{RarityCase.map(caseType => {
							const chancesRarity = getSumChances(caseType.rarity)
							const chancesDrop = getSumChances(caseType.drop)

							return (
									<Box key={caseType.name}>
										<Case caseType={caseType} chancesRarity={chancesRarity} chancesDrop={chancesDrop}/>
										<Text>
											<CaseInfo>
												{caseType.displayname}
											</CaseInfo>
											<Price>
												{caseType.price}
											</Price>
											<CaseButton/>
										</Text>
									</Box>
							)
						})}
					</Section>

					<Heading heading="Стикеры" name="stickers" href="/features/stickers">
						<p>
							При покупке можно указать свой скин, пожелания, идеи,
						</p>
						<p>
							чтобы стикер больше подходил под Вас
						</p>
					</Heading>

					<Author description="Художник-приколист" href="https://t.me/coolpilot2O1O">
						@coolpilot2O1O
					</Author>

					<Section name="stickers">
						<Box className={styles.preview_sticker}>
							<Link href="/features/stickers" className={styles.helper}>
								<ImgBox hover={1.1}>
									<Img
											src="/features/stickers/4.png" alt="Стикер"
											width={225}
									/>
								</ImgBox>
							</Link>
						</Box>

						<Box>
							<Text>
								<CaseInfo description="Обычный стикер">
									Стандарт
								</CaseInfo>
								<Price>
									40
								</Price>
								<StickerButton/>
							</Text>
						</Box>

						<Box>
							<Text>
								<CaseInfo description="Невероятно быстро">
									Экспресс
								</CaseInfo>
								<Price>
									75
								</Price>
								<StickerButton/>
							</Text>
						</Box>
					</Section>

					<Author description="Админ сервера" href="https://t.me/HomeKawa11Fox">
						@HomeKawa11Fox
					</Author>

					<Section name="stickers">
						<Box className={styles.preview_sticker}>
							<Link href="/features/stickers" className={styles.helper}>
								<ImgBox hover={1.1}>
									<Img
											src="/features/stickers/13.png" alt="Стикер"
											width={225}
									/>
								</ImgBox>
							</Link>
						</Box>

						<Box>
							<Text>
								<CaseInfo description="Стикеры, но качественнее">
									Премиум
								</CaseInfo>
								<Price>
									200
								</Price>
								<StickerButton/>
							</Text>
						</Box>

						<Box>
							<Text>
								<CaseInfo description="Лучшие стикеры вне очереди">
									Делюкс
								</CaseInfo>
								<Price>
									300
								</Price>
								<StickerButton/>
							</Text>
						</Box>
					</Section>
				</MaxSize>
			</main>
	);
}