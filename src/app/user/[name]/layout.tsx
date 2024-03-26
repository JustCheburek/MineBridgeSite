import type {PropsWithChildren} from "react";
import type {User} from "lucia";
import {ProfilePage} from "schema-dts";
import {api} from "@server/axios";
import {notFound} from "next/navigation";

// Компоненты
import {SubsectionItem, Subsections} from "@components/subsections";
import {MaxSize} from "@components/maxSize";

export default async function UserLayout({children, params: {name}}: PropsWithChildren<{ params: { name: string } }>) {
	const user = await api<User>(`/user`, {params: {name}}).then(r => r.data).catch(notFound)

	const person: ProfilePage = {
		"@type": "ProfilePage",
		name: name,
		image: user.photo,
		description: `Игрок ${name} играет на Майнбридж, а ты так не можешь что ли?`,
		url: `${process.env.MB_URL}/user/${name}`,
		dateCreated: user.createdAt.toString(),
		dateModified: user.updatedAt.toString()
	}

	return (
			<main>
				<MaxSize sideNav>
					<Subsections menu="Меню профиля">
						<SubsectionItem href={`/user/${name}`}>
							Профиль
						</SubsectionItem>
						<SubsectionItem href={`/user/${name}/history`}>
							История
						</SubsectionItem>
						<SubsectionItem href={`/user/${name}/accounts`}>
							Аккаунты
						</SubsectionItem>
					</Subsections>

					<script type="application/ld+json" dangerouslySetInnerHTML={{__html: person}}/>

					{children}
				</MaxSize>
			</main>
	)
}