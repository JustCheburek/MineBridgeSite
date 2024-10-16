import type {PropsWithChildren} from "react";
import {Suspense} from "react";
import {ProfilePage} from "schema-dts";
import {getUser} from "@/services";

// Компоненты
import {SubsectionItem, Subsections} from "@components/sideNav";
import {MaxSize} from "@components/maxSize";
import type {Metadata} from "next";

type UserLayout = {
	params: { name: string }
}

export const generateMetadata = async ({params: {name}}: { params: { name: string } }): Promise<Metadata> => {
	const {
		user
	} = await getUser(
		{name}, true, false
	)

	return {
		openGraph: {
			type: "profile",
			username: name,
			images: [
				user.photo
			]
		}
	}
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
		url: `${process.env.NEXT_PUBLIC_RU_URL}/user/${name}`,
		// @ts-ignore
		dateCreated: user?.createdAt?.toString() || user?.date?.toString() || new Date().toString(),
		dateModified: user?.updatedAt?.toString() || new Date().toString()
	}

	return (
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
	)
}