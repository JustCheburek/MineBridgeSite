"use client";

// Сервер
import type {User} from "lucia";

// Компоненты
import {Form, FormButton, FormInput, FormLabel, FormTextarea} from "@components/form";
import {Modal, type ModalAction} from "@components/modal";
import {useState} from "react";
import type {isRoles} from "@/services";
import {InputNameCheck, InputNameCheckWithoutState} from "@components/formInputs";
import Link from "next/link";
import {RatingUp} from "@components/ratingUp";

type DeleteUser = {
	user: User
	Delete?: ((formData: FormData) => void)
}

function SuccessModal({modal, setModal, Delete, user}: ModalAction & DeleteUser) {
	const [name, setName] = useState("")

	return (
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
							name={name} setName={setName}
					/>
					<FormButton danger disabled={name !== user.name}>
						Жми, жми!
					</FormButton>
				</Form>
			</Modal>
	)
}

function NoPermModal({modal, setModal}: ModalAction) {
	return (
			<Modal modal={modal} setModal={setModal} centerText={false}>
				<h1>Нет прав</h1>
				<p>
					Твой рейтинг меньше 0,
				</p>
				<p>
					поэтому не можешь удалять аккаунт
				</p>
				<p>
					Но ты можешь:
				</p>
				<RatingUp/>
			</Modal>
	)
}

export function DeleteUser({user, Delete, isAdmin}: { isAdmin: boolean } & DeleteUser) {
	const [modal, setModal] = useState(false)
	const access = isAdmin || user.rating >= 0

	return (<>
		<Form action={() => setModal(true)}>
			<FormButton danger>
				Удалить аккаунт
			</FormButton>
		</Form>
		{access
				? <SuccessModal
						modal={modal}
						setModal={setModal}
						Delete={Delete}
						user={user}
				/>
				: <NoPermModal
						modal={modal}
						setModal={setModal}
				/>
		}
	</>)
}

type ChangeParam = {
	user: User
	isMe: boolean
	Change: ((formData: FormData) => Promise<void>)
} & isRoles

export function ChangeParam(
		{
			user,
			isMe, isModer, isAdmin, isContentMaker,
			Change
		}: ChangeParam) {
	const [result, setResult] = useState("")
	const [access, setAccess] = useState(false)
	const ratingAccess = -50

	return (<>
		{user.rating <= ratingAccess &&
				<div className="grid_center">
					<h3>
						У вас рейтинг ниже {ratingAccess}
					</h3>
					<p>
						Поэтому, чтобы поменять данные вы можете:
					</p>
					<RatingUp/>
				</div>
		}
		<Form action={async formData => {
			try {
				await Change(formData)
			} catch (e) {
				setResult((e as Error).message)
			}
		}}>
			<InputNameCheckWithoutState
					setAccess={setAccess}
					defaultName={user.name}
					disabled={user.rating <= ratingAccess && !isModer}
			/>

			<FormLabel>
				<FormTextarea
						name="photo"
						placeholder="Ссылка на аватарку"
						autoComplete="photo"
						required
						maxLength={200}
						defaultValue={user.photo}
						disabled={user.rating <= ratingAccess && !isModer}
				/>
			</FormLabel>
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
			{result &&
					<strong className="red_color center_text">
						{result}
					</strong>
			}
			<FormButton disabled={user.rating <= ratingAccess && !isModer || !access}>
				Сохранить
			</FormButton>
		</Form>
	</>)
}