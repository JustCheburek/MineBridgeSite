// React
import type {Metadata} from "next";

// Стили
import {RelativeNav} from "@components/relativeNav";
import {MaxSize} from "@components/maxSize";
import {PBox, PText, PTitle} from "@components/post";
import {Img, ImgBox} from "@components/img";

export const metadata: Metadata = {
	title: "Крафты | Майнбридж",
	description: "Самые уникальные, актуальные и нужные крафты сервера!",
};

export default function Crafts() {
	return (
			<main>
				<MaxSize>
					<RelativeNav paths={[{name: "features", displayname: "Фичи"}, {name: "crafts", displayname: "Крафты"}]}/>
					<h1>Крафты</h1>

					<PBox>
						<ImgBox type="post">
							<Img alt="Невидимое освещение" src="/media/features/crafts/light_craft.png"/>
						</ImgBox>
						<PTitle>
							<h2>
								Невидимое освещение
							</h2>
						</PTitle>
						<PText>
							<p>
								Как факел, только невидимый
							</p>
							<p>
								Есть второй вариант крафта, с результатом в 9 блоков, но при этом пыль, слитки и панели заменяются на
								полные блоки
							</p>
						</PText>
					</PBox>

					<PBox>
						<ImgBox type="post">
							<Img alt="Невидимое освещение" src="/media/features/crafts/dragon_breath.png"/>
						</ImgBox>
						<PTitle>
							<h2>
								Драконье дыхание
							</h2>
						</PTitle>
						<PText>
							<p>
								8 бутылок + дранья бошка = 8 бутылок драконьего дыхания
							</p>
						</PText>
					</PBox>

					<PBox>
						<ImgBox type="post">
							<Img alt="Костные блоки" src="/media/features/crafts/bone_block.png"/>
						</ImgBox>
						<PTitle>
							<h2>
								Костные блоки
							</h2>
						</PTitle>
						<PText>
							<p>
								Более быстрый перекрафт в костные блоки
							</p>
						</PText>
					</PBox>

					<h2 className="center_text">Камнерез</h2>
					<PBox>
						<ImgBox type="post">
							<Img alt="Костные блоки" src="/media/features/crafts/strings.png"/>
						</ImgBox>
						<PTitle>
							<h2>
								Нитки
							</h2>
						</PTitle>
						<PText>
							<p>
								Шерсть в нитки, всё просто
							</p>
						</PText>
					</PBox>

					<PBox>
						<ImgBox type="post">
							<Img alt="Лёд" src="/media/features/crafts/ice.png"/>
						</ImgBox>
						<PTitle>
							<h2>
								Лёд
							</h2>
						</PTitle>
						<PText>
							<p>
								Более плотные льды можно разрезать в менее плотные
							</p>
						</PText>
					</PBox>

					<h2 className="center_text">Другое</h2>
					<PBox>
						<ImgBox type="post">
							<Img alt="Невидимая рамка" src="/media/features/crafts/invisible_item_frame.png"/>
						</ImgBox>
						<PTitle>
							<h2>
								Невидимая рамка
							</h2>
						</PTitle>
						<PText>
							<p>
								Для создания нужно кликнуть ножницами по рамке
							</p>
						</PText>
					</PBox>
				</MaxSize>
			</main>
	)
}