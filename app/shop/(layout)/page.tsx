// React
import type {Metadata} from "next";
import Link from "next/link";
import {getCases} from "@/services";

// Компоненты
import {Author, Box, CaseBox, CaseInfo, Heading, Price, Section, StickerButton, Text} from "./components";

// Стили
import styles from "./shop.module.scss"

// Компоненты
import {MostikiSvg} from "@ui/SVGS";
import {Url} from "@components/button";
import {Img, ImgBox} from "@components/img";
import {OnThisPage, OnThisPageHeading, OnThisPageLink} from "@components/sideNav";


export const metadata: Metadata = {
	title: "Магазин | Майнбридж",
	description: "Мостики — внутриигровая валюта. 1 ₽ = 1 мостик. Кейсы, стикеры, всё это про нас!",
};

export default async function Shop() {
	const cases = await getCases()

	return (<>
		<div>
			<h1>Магазин</h1>

			<div className="grid_center">
				<p id="mostiki">
					На сервере действует внутриигровая валюта <strong className="unic_color">мостики</strong>:
				</p>
				<h3 className="center_text">
					1 ₽ = 1 <MostikiSvg/>
				</h3>
				<Url href="/shop/buy">
					Купить
				</Url>
				<p>
					Покупка <Link href={"#stickers"} className="unic_color"><strong>стикеров</strong></Link> {" "}
					происходит только:
				</p>
				<ul>
					<li>
						В дс канале <Link
							href="https://discord.gg/7zx8u4rY"
							target="_blank"
					>
						<strong className="unic_color">
							#покупка
						</strong>
					</Link>
					</li>
					<li>
						У <Link
							href="https://t.me/Kawa11Fox"
							target="_blank"
					>
						<strong className="unic_color">
							Kawa11Fox
						</strong>
					</Link>
					</li>
				</ul>
			</div>

			<Heading heading="Кейсы" href="/case" id="cases">
				<p>
					С помощью кейсов можно кастомизировать свой внешний вид
				</p>
				<p>
					Тип дропа с кейсов можно изменять
				</p>
			</Heading>

			<Section name="cases">
				{cases.map(caseType => (
						<Box key={caseType.name}>
							<CaseBox caseType={caseType}/>
							<Text>
								<CaseInfo>
									{caseType.displayname}
								</CaseInfo>
								<Price oldPrice={caseType.oldPrice}>
									{caseType.price}
								</Price>
								<Url href="/shop/case" margin="10px">
									Купить
								</Url>
							</Text>
						</Box>
				))}
			</Section>

			<Heading heading="Стикеры в телеграм" id="stickers" href="/features/stickers">
				<p>
					При покупке можно указать свой скин, пожелания, идеи,
				</p>
				<p>
					чтобы стикер больше подходил под Вас
				</p>
			</Heading>

			<Author description="Абстрактный художник" href="@Dezelink">
				@Dezelink
			</Author>

			<Section name="stickers">
				<Box className={styles.preview_sticker}>
					<Link href="/features/stickers">
						<ImgBox hover className={styles.helper} overflow={false}>
							<Img
									src="/features/stickers/14.png" alt="Стикер"
									width={225}
							/>
						</ImgBox>
					</Link>
				</Box>

				<Box>
					<Text>
						<CaseInfo description="Абстрактные стикеры">
							Необычные
						</CaseInfo>
						<Price>
							30
						</Price>
						<StickerButton/>
					</Text>
				</Box>

				<Box>
					<Text>
						<CaseInfo description="А где очередь?">
							Speed UP
						</CaseInfo>
						<Price>
							55
						</Price>
						<StickerButton/>
					</Text>
				</Box>
			</Section>

			<Author description="Художник-приколист" href="https://t.me/coolpilot2O1O">
				@coolpilot2O1O
			</Author>

			<Section name="stickers">
				<Box className={styles.preview_sticker}>
					<Link href="/features/stickers">
						<ImgBox hover className={styles.helper} overflow={false}>
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
							60
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
							100
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
					<Link href="/features/stickers">
						<ImgBox hover className={styles.helper} overflow={false}>
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
		</div>

		<OnThisPage>
			<OnThisPageHeading>
				Содержание
			</OnThisPageHeading>
			<OnThisPageLink href="#mostiki">
				Мостики
			</OnThisPageLink>
			<OnThisPageLink href="#cases">
				Кейсы
			</OnThisPageLink>
			<OnThisPageLink href="#stickers">
				Стикеры
			</OnThisPageLink>
		</OnThisPage>
	</>);
}