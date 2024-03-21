import {ColumnDef} from "@tanstack/react-table";
import {CasePurchase} from "@src/types/purchase";

export const columns: ColumnDef<CasePurchase>[] = [
	{
		accessorKey: "case",
		header: "Кейс",
	},
	{
		accessorKey: "price",
		header: "Цена",
		meta: {
			className: "green_color semibold-font center_text"
		}
	},
	{
		accessorKey: "drop",
		header: "Дроп"
	},
	{
		accessorKey: "date",
		header: "Дата",
		meta: {
			className: "center_text",
			isDate: true
		}
	}
]