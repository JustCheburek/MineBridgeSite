import {ColumnDef} from "@tanstack/react-table";
import {Img, ImgBox} from "@components/img";
import styles from "@app/user/[name]/history/history.module.scss";
import type {CaseData} from "@/types/purchase";

export const columns: ColumnDef<CaseData>[] = [
	{
		accessorFn: ({DropItem, Item}) => Item.img
				? `/shop/${DropItem.name}/${Item.name}.webp`
				: Item.displayname,
		header: "Дроп",
		cell: ({row, getValue}) => {
			const {Item, rarity} = row.original
			const value = getValue<string>()
			if (!Item.img) return value
			return (
					<ImgBox className={`${styles.item} ${rarity}_box`} hover width="280px" height="160px">
						<Img src={value} alt={Item.displayname}/>
					</ImgBox>
			)
		}
	},
	{
		accessorKey: "Case",
		header: "Кейс",
		cell: ({row}) => {
			const {Case, Drop} = row.original
			return (<>
				<p>{Case.displayname}</p>
				<p>{Drop.displayname}</p>
			</>)
		},
		meta: {
			className: "center_text"
		}
	},
	{
		accessorFn: ({Case, Drop}) => Case.price + Drop.price,
		header: "Цена",
		meta: {
			type: "number"
		}
	}
]