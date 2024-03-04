// React
import {createColumnHelper} from "@tanstack/react-table";

// Стили
import "./styles/brewery.scss";

// Компоненты
import {RelativeNav} from "@components/relativeNav";
import {Table} from "@components/table";

import recipes from "./recipes.json"
import {MaxSize} from "@components/maxSize";
import type {Metadata} from "next";

export const metadata: Metadata = {
	title: "Brewery | Майнбридж",
	description: "Гайд на плагин Brewery! Ферментация (горячий котёл), дистилляция (зельеварка), выдержка (маленькая и большая бочки). Рецепты алкоголя на сервере MineBridge!",
};

const Box = ({children}) => (
		<div className="container">
			{children}
		</div>
)

const Img = ({src, alt}) => (
		<div className="img_box">
			<img src={src} alt={alt} className="img_box" loading="lazy"/>
		</div>
)

const Text = ({children}) => (
		<div className="text">
			{children}
		</div>
)

const Heading = ({children, number}) => (
		<div className="heading center_text">
			<h2 className="unic_color">{children}</h2>
			{number &&
					<h4>{number} этап</h4>
			}
		</div>
)

const columnHelper = createColumnHelper();

const woods = [
	"", "берёза", "дуб", "?", "ель", "акация", "тёмный дуб"
]

function IngredientsCell({getValue}) {
	const ingredients = getValue()

	return (
			<ul className="not_indent">
				{ingredients.map(ingredient => (
						<li key={ingredient}>
							{ingredient.split("/").reverse().join(" ")}
						</li>
				))}
			</ul>
	)
}

const columns = [
	columnHelper.accessor(data => {
		const names = data.name.split("/")
		const nameIndex = names.length === 3 ? 1 : 0

		return names[nameIndex]
	}, {
		header: "Рецепт"
	}),
	columnHelper.accessor(data => data.ingredients, {
		header: "Ингредиенты",
		cell: IngredientsCell
	}),
	columnHelper.accessor(data => (data.cookingtime || ""), {
		header: "Котёл",
		meta: {
			className: "center_text"
		}
	}),
	columnHelper.accessor(data => (data.distillruns || ""), {
		header: "Светопыль",
		meta: {
			className: "center_text"
		}
	}),
	columnHelper.accessor(data => {
		if (!data.age) return ""

		let year = 'год'

		if (data.age % 100 > 1) year = 'года'
		if (data.age % 100 > 4) year = 'лет'

		const time = `${data.age} ${year}`

		if (data.wood === 0) return time

		return `${time} - ${woods[data.wood]}`
	}, {
		header: "Бочка",
		meta: {
			className: "center_text"
		}
	})
]

export default function Brewery() {
	return (
			<main className="brewery">
				<MaxSize>
					<RelativeNav paths={[{name: "features", displayname: "Фичи"}, {name: "guides", displayname: "Гайды"}, "Brewery"]}/>
					<h1>Brewery</h1>

					<p className="center_text">
						Плагин на дополнительные алкогольные напитки
					</p>

					<Box>
						<Img src="/media/features/guides/brewery/kettle.webp" alt="Котёл"/>

						<Text>
							<Heading number={1}>
								Ферментация
							</Heading>

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
						</Text>
					</Box>

					<Box>
						<Img src="/media/features/guides/brewery/brewing_stand.webp" alt="Зельеварка"/>
						<Text>
							<Heading number={2}>
								Дистилляция
							</Heading>

							<ul>
								<li>
									Положите бутылку с закваской в <span className="medium-font">зельеварку</span>
								</li>
								<li>
									Поместите <span className="medium-font">светящуюся пыль</span> сверху в качестве ингредиента
								</li>
							</ul>
						</Text>
					</Box>

					<Box>
						<Text>
							<Heading number={3}>
								Выдержка
							</Heading>

							<p>
								Для выдержки необходимо построить <span className="medium-font">деревянную бочку</span>
							</p>
							<p>
								Для различных рецептов нужны разные виды дерева
							</p>
						</Text>
						<Img src="/media/features/guides/brewery/small_barrel.webp" alt="Маленькая бочка"/>
						<Text>
							<div className="heading">
								<h3 className="unic_color">
									Маленькая бочка
								</h3>
								<h4>
									9 слотов
								</h4>
							</div>

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
						</Text>
						<Img src="/media/features/guides/brewery/big_barrel.webp" alt="Маленькая бочка"/>
						<Text>
							<div className="heading">
								<h3 className="unic_color">
									Большая бочка
								</h3>
								<h4>
									27 слотов
								</h4>
							</div>

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
						</Text>
					</Box>

					<Table columns={columns} data={Object.values(recipes)}>
						<h2 className="unic_color">Рецепты</h2>
					</Table>
				</MaxSize>
			</main>
	)
}