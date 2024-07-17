// React
import type {Metadata} from "next";

// Типа база данных
import recipes from "./recipes.json"
import {RecipeProps} from "@/types/recipe";
import {columns} from "@columns/brewery"

// Компоненты
import {Table} from "@components/table";
import {MaxSize} from "@components/maxSize";
import {PBox, PText, PTitle} from "@components/post";
import {Img, ImgBox} from "@components/img";
import {H1} from "@components/h1";

export const metadata: Metadata = {
	title: "Brewery | Майнбридж",
	description: "Гайд на плагин Brewery! Ферментация (горячий котёл), дистилляция (зельеварка), выдержка (маленькая и большая бочки). Рецепты алкоголя на сервере MineBridge!",
};

export default function Brewery() {
	return (
			<MaxSize>
				<H1 up paths={[
					{name: "features", displayname: "Фичи"},
					{name: "guides", displayname: "Гайды"},
					{name: "brewery", displayname: "Brewery"}
				]}>
					Brewery
				</H1>

				<p className="center_text">
					Плагин на дополнительные алкогольные напитки
				</p>

				<PBox>
					<ImgBox type="post">
						<Img src="/features/guides/brewery/kettle.webp" alt="Котёл"/>
					</ImgBox>

					<PTitle>
						<h2>Ферментация</h2>
						<h4>1 этап</h4>
					</PTitle>

					<PText>
						<ul>
							<li>
								Поставьте <span className="medium-font">котёл</span> на источник тепла<br/>
								<small>(лаву, магму или огонь)</small>
							</li>
							<li>
								Наполните его водой
							</li>
							<li>
								Добавьте <span className="medium-font">ингредиенты</span> в котёл с помощью ПКМ
							</li>
							<li>
								Ожидайте указанное в рецепте время
							</li>
							<li>
								Забирайте закваску <span className="medium-font">стеклянными бутыльками</span>
							</li>
						</ul>
					</PText>
				</PBox>

				<PBox>
					<ImgBox type="post">
						<Img src="/features/guides/brewery/brewing_stand.webp" alt="Зельеварка"/>
					</ImgBox>

					<PTitle>
						<h2>Дистилляция</h2>
						<h4>2 этап</h4>
					</PTitle>

					<PText>
						<ul>
							<li>
								Положите бутылку с закваской в <span className="medium-font">зельеварку</span>
							</li>
							<li>
								Поместите <span className="medium-font">светящуюся пыль</span> сверху в качестве ингредиента
							</li>
						</ul>
					</PText>
				</PBox>

				<PBox>
					<PTitle>
						<h2>Выдержка</h2>
						<h4>3 этап</h4>
					</PTitle>

					<PText>
						<p>
							Для выдержки необходимо построить <span className="medium-font">деревянную бочку</span>
						</p>
						<p>
							Для различных рецептов нужны разные виды дерева
						</p>
						<p>
							Один майнкрафт день = 1 год
						</p>
					</PText>

					<ImgBox type="post">
						<Img src="/features/guides/brewery/small_barrel.webp" alt="Маленькая бочка"/>
					</ImgBox>

					<PTitle>
						<h3>
							Маленькая бочка
						</h3>
						<h4>
							9 слотов
						</h4>
					</PTitle>

					<PText>
						<div>
							<p>
								Для постройки нужно:
							</p>

							<ul>
								<li>
									8 ступенек
								</li>
								<li>
									Табличка с надписью «<span className="unic_color all_select medium-font">Бочка</span>»
								</li>
							</ul>
						</div>
					</PText>

					<ImgBox type="post">
						<Img src="/features/guides/brewery/big_barrel.webp" alt="Маленькая бочка"/>
					</ImgBox>

					<PTitle>
						<h3>
							Большая бочка
						</h3>
						<h4>
							27 слотов
						</h4>
					</PTitle>

					<PText>
						<div>
							<p>
								Для постройки нужно (полая внутри):
							</p>
							<ul>
								<li>
									16 ступенек
								</li>
								<li>
									18 досок
								</li>
								<li>
									1 забор
								</li>
								<li>
									Табличка с надписью «<span className="unic_color all_select medium-font">Бочка</span>»
								</li>
							</ul>
						</div>
					</PText>
				</PBox>

				<Table<RecipeProps>
						columns={columns}
						data={Object.values(recipes)}
				>
					<h2 className="unic_color">Рецепты</h2>
				</Table>
			</MaxSize>
	)
}