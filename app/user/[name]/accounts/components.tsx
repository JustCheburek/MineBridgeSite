"use client";

// Сервер
import type {User} from "lucia";

// Компоненты
import {Form, FormButton, FormInput, FormLabel, FormTextarea} from "@components/form";
import {Modal} from "@components/modal";
import {useState} from "react";

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
				<FormLabel>
					<FormInput
							name="name"
							danger
							placeholder={user.name}
							autoComplete="off"
							required
							value={name}
							onChange={(e) => setName(e.target.value)}
					/>
				</FormLabel>
				<FormButton danger disabled={name !== user.name}>
					Жми, жми!
				</FormButton>
			</Form>
		</Modal>
	</>)
}

type ChangeParam = {
	user: User
	isAdmin: boolean
	isModer: boolean
	isMe: boolean
	Change?: ((formData: FormData) => void)
}

export function ChangeParam({user, isMe, isModer, isAdmin, Change}: ChangeParam) {
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
						Поэтому чтобы поменять ник
					</p>
					<p>
						{isMe
								? "попросите модера или админа"
								: "он может попросить Вас"
						}
					</p>
				</div>
		}
		<Form action={Change}>
			<FormLabel>
				<FormInput
						placeholder="Майнкрафт никнейм"
						name="name"
						autoComplete="name"
						required
						minLength={4}
						maxLength={30}
						defaultValue={user.name}
						disabled={user.rating <= -100 && !isModer}
				/>
			</FormLabel>
			<FormLabel>
				<FormTextarea
						name="photo"
						placeholder="Ссылка на аватарку"
						autoComplete="photo"
						required
						maxLength={200}
						defaultValue={user.photo}
						disabled={user.rating <= -100 && !isModer}
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
			<FormButton>
				Сохранить
			</FormButton>
		</Form>
	</>)
}