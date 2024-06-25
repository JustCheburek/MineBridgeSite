"use client";

// Сервер
import type {User} from "lucia";

// Компоненты
import {Form, FormButton, FormInput, FormLabel, FormTextarea} from "@components/form";
import {Modal} from "@components/modal";
import {useState} from "react";
import {isRoles} from "@/services";
import {InputNameCheck, InputNameCheckWithoutNameInput} from "@components/formInputs";

type DeleteUser = {
	user: User
	Delete?: ((formData: FormData) => void)
}

export function DeleteUser({user, Delete}: DeleteUser) {
	const [modal, setModal] = useState(false)
	const [name, setName] = useState("")

	return (<>
		<Form action={() => setModal(true)}>
			<FormButton danger>
				Удалить аккаунт
			</FormButton>
		</Form>
		<Modal modal={modal} setModal={setModal}>
			<h1>Удаление</h1>
			<p>
				Ты уверен, что хочешь
			</p>
			<p>
				удалить свой аккаунт <strong className="red_color">безвозвратно</strong>?
			</p>
			<h4>Тогда введи свой <strong className="red_color">ник</strong></h4>
			<Form action={Delete}>
				<InputNameCheck
						danger placeholder={user.name}
						autoComplete="off"
						nameInput={name} setNameInput={setName}
				/>
				<FormButton danger disabled={name !== user.name}>
					Жми, жми!
				</FormButton>
			</Form>
		</Modal>
	</>)
}

type ChangeParam = {
	user: User
	isMe: boolean
	Change: ((formData: FormData) => Promise<string>)
} & isRoles

export function ChangeParam(
		{
			user,
			isMe, isModer, isAdmin, isContentMaker,
			Change
		}: ChangeParam) {
	const [result, setResult] = useState("")

	if (!isMe && !isModer) return

	return (<>
		{user.rating <= -50 &&
				<div className="center_text">
					<h3>
						{isMe
								? "У вас рейтинг ниже -50"
								: "У игрока рейтинг ниже -50"
						}
					</h3>
					<p>
						Поэтому, чтобы поменять ник
					</p>
					<p>
						{isMe
								? "попросите модера или админа"
								: "он может попросить Вас"
						}
					</p>
				</div>
		}
		<Form action={async formData => {
			setResult(await Change(formData))
		}}>
			{result && <h2>{result}</h2>}

			<InputNameCheckWithoutNameInput
					defaultName={user.name}
					disabled={user.rating <= -50 && !isModer}
			/>

			<FormLabel>
				<FormTextarea
						name="photo"
						placeholder="Ссылка на аватарку"
						autoComplete="photo"
						required
						maxLength={200}
						defaultValue={user.photo}
						disabled={user.rating <= -50 && !isModer}
				/>
			</FormLabel>
			{isContentMaker && <>
				<p className="center_text">
					Добавьте ссылки<br/>
					на ваши соцсети
				</p>
				<div className="center_text">
					<h3>
						Ники
					</h3>
					<p>
						Нужны <span className="unic_color">уникальные</span> ники,<br/>
						не отображаемые
					</p>
				</div>
				<FormLabel>
					<FormInput
							placeholder="Youtube"
							name="youtube"
							autoComplete="name"
							defaultValue={user.socials?.find(({social}) => social === "youtube")?.name}
					/>
				</FormLabel>
				<FormLabel>
					<FormInput
							placeholder="Twitch"
							name="twitch"
							autoComplete="name"
							defaultValue={user.socials?.find(({social}) => social === "twitch")?.name}
					/>
				</FormLabel>
				<FormLabel>
					<FormInput
							placeholder="VK"
							name="vk"
							autoComplete="name"
							defaultValue={user.socials?.find(({social}) => social === "vk")?.name}
					/>
				</FormLabel>
				<FormLabel>
					<FormInput
							placeholder="DonationAlerts"
							name="donationAlerts"
							defaultValue={user.socials?.find(({social}) => social === "donationAlerts")?.name}
					/>
				</FormLabel>
				<div className="center_text">
					<h3>
						Ссылки на каналы
					</h3>
				</div>
				<FormLabel>
					<FormInput
							placeholder="Discord"
							name="discord"
							defaultValue={user.socials?.find(({social}) => social === "discord")?.url}
					/>
				</FormLabel>
				<FormLabel>
					<FormInput
							placeholder="Telegram"
							name="telegram"
							defaultValue={user.socials?.find(({social}) => social === "telegram")?.url}
					/>
				</FormLabel>
			</>}
			{isAdmin &&
					<FormLabel>
						<FormInput
								name="mostiki"
								type="number"
								placeholder="Мостики"
								autoComplete="mostiki"
								required
								defaultValue={user.mostiki}
						/>
					</FormLabel>
			}
			<FormButton disabled={user.rating <= -100 && !isModer}>
				Сохранить
			</FormButton>
		</Form>
	</>)
}