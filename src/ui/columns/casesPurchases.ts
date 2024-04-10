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
			type: "number"
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
			type: "date"
		}
	}
]