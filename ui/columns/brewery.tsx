"use client"

import {ColumnDef} from "@tanstack/react-table";
import type {RecipeProps} from "@/types/recipe";

const woods = [
	"любое", "берёза", "дуб", "?", "ель", "акация", "тёмный дуб"
]

export const columns: ColumnDef<RecipeProps>[] = [
	{
		accessorKey: "name",
		header: "Рецепт",
		cell: ({getValue}: {getValue: Function}) => {
			const names: string[] = getValue().split("/")
			const nameIndex = names.length === 3 ? 1 : 0
			return names[nameIndex]
		}
	},
	{
		accessorKey: "ingredients",
		header: "Ингредиенты",
		cell: ({getValue}: {getValue: Function}) => {
			const ingredients: string[] = getValue()

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
	},
	{
		accessorKey: "cookingtime",
		header: "Котёл",
		meta: {
			className: "center_text"
		},
		cell: ({getValue}: {getValue: Function}) => getValue() || ""
	},
	{
		accessorKey: "distillruns",
		header: "Светопыль",
		meta: {
			className: "center_text"
		},
		cell: ({getValue}: {getValue: Function}) => getValue() || ""
	},
	{
		accessorKey: "age",
		header: "Бочка",
		meta: {
			className: "center_text"
		},
		cell: ({getValue}: {getValue: Function}) => getValue() || ""
	},
	{
		accessorKey: "wood",
		header: "Дерево",
		meta: {
			className: "center_text"
		},
		cell: ({getValue}: {getValue: Function}) => woods[Number(getValue())] || "любое"
	},
]