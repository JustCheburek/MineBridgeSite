// React
import {useChangeDictState, useChangeListState} from "@hooks/useChangeState";
import {User} from "lucia";
import {type Action, Punishment} from "@/types/punishment";

// Компоненты
import {Modal, type setModal} from "@components/modal";
import {Form, FormButton, FormGroup, FormInput, FormLabel} from "@components/form";

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
	const [punishment,, onPunishmentChange] = useChangeDictState(
			{author: name} as Punishment
	)

	const [actions,, onActionsChange] = useChangeListState<Action>()

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
								onChange={onPunishmentChange}
						/>
					</FormLabel>
					<FormLabel>
						<FormInput
								name="rating"
								type="number"
								placeholder="Рейтинг"
								autoComplete="rating"
								value={punishment.rating}
								onChange={onPunishmentChange}
						/>
					</FormLabel>
					<FormLabel>
						<FormInput
								name="author"
								placeholder="Автор"
								autoComplete="author"
								value={punishment.author}
								onChange={onPunishmentChange}
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
									onChange={onActionsChange}
							/>
							Мут
						</FormLabel>
						<FormLabel>
							<FormInput
									type="checkbox"
									name="unmute"
									disabled={punishment.rating < 0 || actions.includes("mute")}
									checked={actions.includes("unmute")}
									onChange={onActionsChange}
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
									onChange={onActionsChange}
							/>
							Бан
						</FormLabel>
						<FormLabel>
							<FormInput
									type="checkbox"
									name="minePardon"
									disabled={punishment.rating < 0 || actions.includes("mineBan")}
									checked={actions.includes("minePardon")}
									onChange={onActionsChange}
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
									onChange={onActionsChange}
							/>
							Бан
						</FormLabel>
						<FormLabel>
							<FormInput
									type="checkbox"
									name="dsPardon"
									disabled={punishment.rating < 0 || actions.includes("dsBan") || !user.discordId}
									checked={actions.includes("dsPardon")}
									onChange={onActionsChange}
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