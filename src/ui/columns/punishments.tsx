"use client"

// Utils
import {ColorText} from "@app/utils";
import {ColumnDef} from "@tanstack/react-table";
import {Punishment} from "@src/types/punishment";

export const columns: ColumnDef<Punishment>[] = [
	{
		accessorKey: "reason",
		header: "Причина"
	},
	{
		accessorKey: "rating",
		header: "Рейтинг",
		meta: {
			className: ({rating}) => `center_text semibold-font ${ColorText(rating)}`
		}
	},
	{
		accessorKey: "author",
		header: "Автор",
		meta: {
			className: "center_text"
		}
	},
	{
		accessorKey: "createdAt",
		header: "Создание",
		meta: {
			className: "center_text",
			isDate: true
		}
	}
]