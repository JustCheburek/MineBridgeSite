// React
import {Helmet} from "react-helmet";
import {useParams} from "react-router-dom";

// Стили
import "./styles/profile.scss"

// Hooks
import {useGetUser} from "../../hooks/userQueries";

// Компоненты
import {ProfileSection} from "./components/profile_section";
import {WhitelistSection} from "./components/whitelist_section";
import {Loading} from "@components/loading";
import {SubsectionItem, Subsections} from "@components/subsections";

export function Component() {
	const {name} = useParams()

	const {
		isLoading,
		isError,
		error,
		data
	} = useGetUser(name)

	// Загрузка
	if (isLoading) {
		return <Loading/>
	}

	// Ошибка
	if (isError) {
		throw error
	}

	const {user} = data

	const person = {
		"@context": "https://schema.org",
		"@type": "ProfilePage",
		"name": user.name,
		"image": user.image,
		"description": `Игрок ${user.name} играет на Майнбридж, а ты так не можешь что ли?`,
		"url": `https://minebridge.site/user/${user.name}`
	}

	return (
			<main className="profile">
				<MaxSize>
					<Helmet>
						<title>{user.name} | Майнбридж</title>
						<meta
								charSet="UTF-8"
								content={`Игрок ${user.name} играет на Майнбридж, а ты так не можешь что ли? `}
								name="description"
						/>

						<script type="application/ld+json">{JSON.stringify(person)}</script>
					</Helmet>

					<Subsections menu="Меню профиля">
						<SubsectionItem href={`/user/${user.name}`}>
							Профиль
						</SubsectionItem>
						<SubsectionItem href={`/user/${user.name}/history`}>
							История
						</SubsectionItem>
						<SubsectionItem href={`/user/${user.name}/accounts`}>
							Аккаунты
						</SubsectionItem>
					</Subsections>

					<div className="profile_content">
						<ProfileSection/>

						<WhitelistSection/>
					</div>
				</MaxSize>
			</main>
	)
}