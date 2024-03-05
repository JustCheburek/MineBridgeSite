import {createColumnHelper} from "@tanstack/react-table";
import type {RecipeProps} from "@src/types/Recipe";

const woods = [
	"", "берёза", "дуб", "?", "ель", "акация", "тёмный дуб"
]

const columnHelper = createColumnHelper<RecipeProps>()

export const columns = [
	columnHelper.accessor(async data => {
		"use server";
		const names = data.name.split("/")
		const nameIndex = names.length === 3 ? 1 : 0

		return names[nameIndex]
	}, {
		header: "Рецепт"
	}),
	columnHelper.accessor("ingredients", {
		header: "Ингредиенты",
		cell: IngredientsCell
	}),
	columnHelper.accessor(async data => {
		"use server";
		return data.cookingtime || ""
	}, {
		header: "Котёл",
		meta: {
			className: "center_text"
		}
	}),
	columnHelper.accessor(async data => {
		"use server";
		return data.distillruns || ""
	}, {
		header: "Светопыль",
		meta: {
			className: "center_text"
		}
	}),
	columnHelper.accessor("age", {
		header: "Бочка",
		cell: AgeCell,
		meta: {
			className: "center_text"
		}
	}),
	columnHelper.accessor(async data => {
		"use client";
		return woods[data.wood] || ""
	}, {
		header: "Дерево",
		meta: {
			className: "center_text"
		}
	})
]

async function IngredientsCell({getValue}: any) {
	"use server"
	const ingredients: string[] = getValue()
	console.log(ingredients)

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

async function AgeCell({getValue}: any) {
	"use server"
	const age = await getValue()

	if (!age) return ""

	let year = 'г'
	if (age % 100 > 4) {
		year = 'л'
	}

	return `${age} ${year}`
}