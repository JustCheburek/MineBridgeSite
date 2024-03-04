// React
import {useParams} from "react-router-dom";

// Hooks
import {useGetUser} from "../../../hooks/userQueries";

// Компоненты
import {Table} from "@components/table";
import TimeAgo from "javascript-time-ago";
import {createColumnHelper} from "@tanstack/react-table";

const timeAgo = new TimeAgo("")
const columnHelper = createColumnHelper();

const columns = [
	columnHelper.accessor(purchase => purchase.caseRarity.displayname, {
		header: "Редкость"
	}),
	columnHelper.accessor(purchase => purchase.caseType.displayname, {
		header: "Тип",
	}),
	columnHelper.accessor("price", {
		header: "Цена",
		meta: {
			className: "green_color semibold-font"
		}
	}),
	columnHelper.accessor(purchase => purchase.resultDrop.displayname, {
		header: "Дроп"
	}),
	columnHelper.accessor(data => timeAgo.format(new Date(data.date), "mini"), {
		header: "Время"
	})
]

export function CasesPurchasesSection() {
	const {name} = useParams()

	const {data: {user}} = useGetUser(name)

	return (
			<Table columns={columns} data={user.casesPurchases} className="center_text">
				<h2>
					Покупки кейсов
				</h2>
			</Table>
	)
}