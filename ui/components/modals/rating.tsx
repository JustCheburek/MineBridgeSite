// React
import {useChangeDictState, useChangeListState} from "@hooks/useChangeState";
import type {User} from "lucia";
import {type Action, Punishment} from "@/types/punishment";

// Компоненты
import {Modal, type setModal} from "@components/modal";
import {FormBox, FormButton, FormGroup, FormInput, FormLabel} from "@components/formBox";
import {H1} from "@components/h1";
import {AddPunishment} from "@services/user/punishment";

type RatingModal = {
    name?: User["name"]
    user: User
    modal: boolean
    setModal: setModal
}

export const RatingModal = (
    {
        name, user,
        modal, setModal
    }: RatingModal) => {
    const [punishment, , onPunishmentChange] = useChangeDictState(
        {author: name} as Punishment
    )

    const [actions, , onActionsChange] = useChangeListState<Action>()

    return (
        <Modal setModal={setModal} modal={modal}>
            <H1>Звёзды</H1>
            <FormBox action={() => {
                setModal(false)
                AddPunishment(user, punishment, actions)
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
                        placeholder="Звёзды"
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
            </FormBox>
        </Modal>
    )
}