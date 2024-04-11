import {Suspense} from "react";
import type {PropsWithChildren} from "react";
import {ProfilePage} from "schema-dts";
import {getUser} from "@src/services";

// Компоненты
import {SubsectionItem, Subsections} from "@components/sideNav";
import {MaxSize} from "@components/maxSize";

type UserLayout = {
	params: { name: string }
}

export default async function UserLayout(
		{
			children,
			params: {name}
		}: PropsWithChildren<UserLayout>) {
	const {user} = await getUser({name})

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
			</main>
	)
}