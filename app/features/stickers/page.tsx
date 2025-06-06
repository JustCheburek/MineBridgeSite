// React
import type {Metadata} from "next";

// Компоненты
import {Url} from "@components/button";
import {MaxSize} from "@components/maxSize";
import {Img, ImgBox} from "@components/img";
import {GContainer} from "@components/grid";
import {H1} from "@components/h1";

export const metadata: Metadata = {
	title: "Стикеры",
	description: "Можно добавить себе в телеграм. Нарисованы руками художников сервера!"
};

export default function Stickers() {
	return (
			<MaxSize>
				<H1 up paths={[
					{name: "features", displayname: "Фичи"},
					{name: "stickers", displayname: "Стикеры"}
				]}>
					Стикеры
				</H1>
				<p>
					Рисовка стикера занимает{" "}
					<span className="medium-font">от 2 до 6 недель</span>{" "}
					в зависимости от сложности, возможны задержки
				</p>
				<p>
					Стикеры добавляются в{" "}
					<span className="medium-font">телеграм</span>,
					по желанию администрации могут добавиться и на{" "}
					<span className="medium-font">дискорд сервер</span>
				</p>

				<Url href="https://t.me/addstickers/MineBridge">
					Добавить
				</Url>

				<GContainer width={200} height={200}>
					{Array(15).fill(null).map((_, sticker) => {
						let path = `/features/stickers/${sticker}.png`

						return (
								<ImgBox key={sticker} hover>
									<Img src={path} alt="стикер" width={200} height={200}/>
								</ImgBox>
						)
					})}
				</GContainer>

				<h3 className="center_text">Тоже хотите попасть в стикер пак?</h3>
				<Url href="/shop#stickers">
					Да, и что?
				</Url>
			</MaxSize>
	)
}
