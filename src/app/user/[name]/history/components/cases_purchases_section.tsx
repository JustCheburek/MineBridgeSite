// Сервер
import {CasePurchase} from "@src/types/purchase";
import type {User} from "lucia";

// Колонны
import {columns} from "@columns/casesPurchases";

// Компоненты
import {Table} from "@components/table";


export function CasesPurchasesSection({user}: { user: User }) {
	return (
			<Table<CasePurchase>
					columns={columns}
					data={user.casesPurchases}
			>
				<h2>
					Покупки кейсов
				</h2>
			</Table>
	)
}