import {Suspense} from "react";
import type {PropsWithChildren, ReactNode} from "react";
import {ProfilePage} from "schema-dts";
import {UserGet} from "@src/service";

// Компоненты
import {SubsectionItem, Subsections} from "@components/subsections";
import {MaxSize} from "@components/maxSize";

type UserLayout = {
	modal: ReactNode
	params: { name: string }
}

export default async function UserLayout(
		{
			children,
			modal,
			params: {name}
		}: PropsWithChildren<UserLayout>) {
	const user = await UserGet({name})

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

					<script type="application/ld+json" dangerouslySetInnerHTML={{__html: JSON.stringify(person)}}/>

					<Suspense fallback={
						<p className="center_text">Загрузка...</p>
					}>
						{children}
					</Suspense>
				</MaxSize>

				{modal}
			</main>
	)
}