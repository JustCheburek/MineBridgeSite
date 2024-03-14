// Сервер
import Link from "next/link";
import {api} from "@server/axios"
import type {User} from "lucia";

// Компоненты
import {PunishmentSection} from "./components/punishment_section";
import {CasesPurchasesSection} from "./components/cases_purchases_section";

// Стили
import styles from "./history.module.scss";

export const generateMetadata = async ({params: {name}}: { params: { name: string } }) => ({
	title: `${name} > Истории действий | Майнбридж`,
	description: `История рейтинга и всяких покупок игрока ${name}!`,
})

export default async function History({params: {name}}: { params: { name: string } }) {
	const {data: user}: { data: User | null } = await api(`/user?name=${name}`)

	return (
			<div className={styles.integration_content}>
				<h1>История</h1>

				{user.punishments?.length
						? <PunishmentSection user={user}/>
						: <div className="center_text">
							<h2>Рейтинг</h2>
							<Link href="/rules" className="unic_color medium-font">Как повышать рейтинг?</Link>
						</div>
				}

				{user.casesPurchases?.length
						? <CasesPurchasesSection user={user}/>
						: <div className="center_text">
							<h2>Покупки кейсов</h2>
							<Link href="/shop" className="unic_color medium-font">Как покупать?</Link>
						</div>
				}
			</div>
	)
}