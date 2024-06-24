"use client"

import {ColumnDef} from "@tanstack/react-table";
import type {RecipeProps} from "@/types/recipe";

const woods = [
	"", "берёза", "дуб", "?", "ель", "акация", "тёмный дуб"
]

export const columns: ColumnDef<RecipeProps>[] = [
	{
		accessorFn: row => {
			const names: string[] = row.name.split("/")
			const nameIndex = names.length === 3 ? 1 : 0
			return names[nameIndex]
		},
		header: "Рецепт"
	},
	{
		accessorFn: row => {
			return row.ingredients?.map(ingredient =>
					ingredient?.split("/")?.reverse()?.join(" ")
			)
		},
		header: "Ингредиенты",
		cell: ({getValue}: { getValue: Function }) => {
			const ingredients: string[] = getValue()

			return (
					<ul className="not_indent remove_marker">
						{ingredients.map(ingredient => (
								<li key={ingredient}>
									{ingredient}
								</li>
						))}
					</ul>
			)
		}
	},
	{
		accessorFn: row => {
			if (!row.cookingtime) return ""
			return `${row.cookingtime} мин`
		},
		header: "Котёл (мин)",
		meta: {
			className: "center_text"
		}
	},
	{
		accessorFn: row => {
			if (!row.distillruns) return ""
			return `${row.distillruns} шт`
		},
		header: "Светопыль",
		meta: {
			className: "center_text"
		}
	},
	{
		accessorFn: row => {
			if (!row.age) return ""
			let age = "лет"

			if (row.age === 1) age = "год"
			if (row.age > 1 && row.age < 5) age = "года"

			const wood = woods[Number(row.wood)]

			return `${row.age} ${age} ${wood && `| ${wood}`}`
		},
		header: "Бочка",
		meta: {
			className: "center_text"
		}
	}
]