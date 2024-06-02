// React
import {User} from "lucia";

// Компоненты
import {Modal, type setModal} from "@components/modal";
import {Form, FormButton, FormGroup, FormInput, FormLabel} from "@components/form";
import {ChangeEvent, useState} from "react";
import {Action, Punishment} from "@/types/punishment";

type RatingModal = {
	name?: User["name"]
	user: User
	ratingFunc: Function
	modal: boolean
	setModal: setModal
}

export const RatingModal = (
		{
			name, user, ratingFunc,
			modal, setModal
		}: RatingModal) => {
	const [punishment, setPunishment] = useState(
			{author: name} as Punishment
	)

	const [actions, setActions] = useState(
			[] as Action[]
	)

	const ratingChange = (e: ChangeEvent<HTMLInputElement>) => {
		setPunishment({
			...punishment,
			[e.target.name]: e.target.value
		})
	}

	const actionsChange = (e: ChangeEvent<HTMLInputElement>) => {
		if (e.target.checked) {
			setActions([...actions, e.target.name as Action])
		} else {
			setActions(actions.filter((action) =>
					action !== e.target.name
			))
		}
	}

	return (
			<Modal setModal={setModal} modal={modal}>
				<h1>Рейтинг</h1>
				<Form action={() => {
					ratingFunc(punishment, actions)
					setModal(false)
				}}>
					<FormLabel>
						<FormInput
								name="reason"
								placeholder="Причина"
								autoComplete="reason"
								maxLength={26}
								value={punishment.reason}
								onChange={ratingChange}
						/>
					</FormLabel>
					<FormLabel>
						<FormInput
								name="rating"
								type="number"
								placeholder="Рейтинг"
								autoComplete="rating"
								value={punishment.rating}
								onChange={ratingChange}
						/>
					</FormLabel>
					<FormLabel>
						<FormInput
								name="author"
								placeholder="Автор"
								autoComplete="author"
								value={punishment.author}
								onChange={ratingChange}
						/>
					</FormLabel>
					<h3>Везде</h3>
					<FormGroup aria-disabled={!user.discordId}>
						<FormLabel>
							<FormInput
									type="checkbox"
									name="mute"
									disabled={punishment.rating > 0 || actions.includes("unmute")}
									checked={actions.includes("mute")}
									onChange={actionsChange}
							/>
							Мут
						</FormLabel>
						<FormLabel>
							<FormInput
									type="checkbox"
									name="unmute"
									disabled={punishment.rating < 0 || actions.includes("mute")}
									checked={actions.includes("unmute")}
									onChange={actionsChange}
							/>
							Размут
						</FormLabel>
					</FormGroup>
					<h3>Майн</h3>
					<FormGroup>
						<FormLabel>
							<FormInput
									type="checkbox"
									name="mineBan"
									disabled={punishment.rating > 0 || actions.includes("minePardon")}
									checked={actions.includes("mineBan")}
									onChange={actionsChange}
							/>
							Бан
						</FormLabel>
						<FormLabel>
							<FormInput
									type="checkbox"
									name="minePardon"
									disabled={punishment.rating < 0 || actions.includes("mineBan")}
									checked={actions.includes("minePardon")}
									onChange={actionsChange}
							/>
							Разбан
						</FormLabel>
					</FormGroup>
					<h3 className={user.discordId ? "" : "red_color"}>
						{user.discordId
								? "Дс"
								: "Нету дс"
						}
					</h3>
					<FormGroup>
						<FormLabel>
							<FormInput
									type="checkbox"
									name="dsBan"
									disabled={punishment.rating > 0 || actions.includes("dsPardon") || !user.discordId}
									checked={actions.includes("dsBan")}
									onChange={actionsChange}
							/>
							Бан
						</FormLabel>
						<FormLabel>
							<FormInput
									type="checkbox"
									name="dsPardon"
									disabled={punishment.rating < 0 || actions.includes("dsBan") || !user.discordId}
									checked={actions.includes("dsPardon")}
									onChange={actionsChange}
							/>
							Разбан
						</FormLabel>
					</FormGroup>
					<FormButton>
						Добавить
					</FormButton>
				</Form>
			</Modal>
	)
}