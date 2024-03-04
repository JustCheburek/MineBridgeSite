// React
import {useNavigate, useParams} from "react-router-dom";
import {useDeleteUser, useGetUser} from "../../hooks/userQueries";
import {Helmet} from "react-helmet";
import {useState} from "react";

// Стили
import "./styles/accounts.scss"

// Компоненты
import {Loading} from "@components/loading";
import {SubsectionItem, Subsections} from "@components/subsections";
import {DiscordSvg, GoogleSvg, MailSvg, SuccessSvg} from "@ui/svgs";
import {FormButton} from "@components/form";
import {Modal} from "@components/modal";
import { MaxSize } from "@ui/components/maxSize";


export function Component() {
	const {name} = useParams()
	const [modal, setModal] = useState(false)
	const navigate = useNavigate();

	const {
		isLoading,
		isError,
		error,
		data
	} = useGetUser(name)

	const {mutate} = useDeleteUser(name)

	// Загрузка
	if (isLoading) {
		return <Loading/>
	}

	// Ошибка
	if (isError) {
		throw error
	}

	const {user, isMe, author} = data

	const access = isMe || author.isAdmin

	const person = {
		"@context": "https://schema.org",
		"@type": "ProfilePage",
		"name": user.name,
		"image": user.image,
		"description": `Аккаунты игрока ${user.name}, почта, гугл, дискорд...`,
		"url": `https://minebridge.site/user/${user.name}/accounts`
	}

	function deleteSubmit(e) {
		e.preventDefault()
		mutate()
		navigate("/")
	}

	return (
			<main className="accounts">
				<MaxSize>
					<Helmet>
						<title>{user.name} > Аккаунт | Майнбридж</title>
						<meta
								charSet="UTF-8"
								content={`Аккаунты игрока ${user.name}, почта, гугл, дискорд...`}
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

					<div className="account_content">
						<h1>
							{window.innerWidth > 370
									? "Аккаунты"
									: "Акки"
							}
						</h1>

						<div className="providers_box">
							<Provider
									name="mail"
									id={user?.email}
									isMe={isMe}
									logo={<MailSvg className="provider unic_color"/>}
							/>
							<Provider
									name="discord"
									id={user.discordId}
									isMe={isMe}
									logo={<DiscordSvg className="provider color"/>}
							/>
							<Provider
									name="google"
									id={user.googleId}
									isMe={isMe}
									logo={<GoogleSvg className="provider"/>}
							/>
							{access &&
									<>
										<form className="form" onSubmit={e => {
											e.preventDefault()
											setModal(true)
										}}>
											<FormButton className="danger">
												Удалить аккаунт
											</FormButton>
										</form>
										<Modal modal={modal} setModal={setModal}>
											<h1>Удаление</h1>
											<p>
												Ты уверен, что хочешь удалить свой аккаунт <strong className="red_color">безвозвратно</strong>?
											</p>
											<form className="form" onSubmit={deleteSubmit}>
												<FormButton className="danger">
													Да, удалить!
												</FormButton>
											</form>
										</Modal>
									</>
							}
						</div>
					</div>
				</MaxSize>
			</main>
	)
}

function Provider({id, name, isMe, logo}) {
	if (!id && !isMe) {
		return null
	}

	return (
			<div className="box">
				{logo}
				{id
						? <>
							<p className="all_select medium-font">
								{id}
							</p>
							<SuccessSvg/>
						</>
						: <a href={`/api/${name}`} className="unic_color medium-font" target="_blank" rel="noopener noreferrer">
							Привязать
						</a>
				}
			</div>
	)
}