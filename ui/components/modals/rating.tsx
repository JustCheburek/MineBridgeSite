"use client";

// React
import type { User } from "lucia";

// Компоненты
import { Modal, type setModal } from "@components/modal";
import { Form, FormGroup, FormInput, FormLabel } from "@components/form";
import { H1 } from "@components/h1";
import { AddPunishment } from "@services/user/punishment";
import { HookButton } from "@components/hookbutton";
import { ErrorMessage } from "@components/error";
import { useActionStateId } from "@/hooks/useActionStateId";

type RatingModalProps = {
    name?: User["name"]
    user: User
    modal: boolean
    setModal: setModal
}

export function RatingModal({
    name, user,
    modal, setModal
}: RatingModalProps) {
    const [state, formAction] = useActionStateId(
        AddPunishment,
        { success: true, data: { _id: user._id } }
    );

    return (
        <Modal setModal={setModal} modal={modal}>
            <H1>Звёзды</H1>
            <Form
                action={formAction}
                onSubmit={() => state.success && setModal(false)}
            >
                <FormLabel>
                    <FormInput
                        name="reason"
                        placeholder="Причина"
                        autoComplete="reason"
                        maxLength={26}
                        required
                    />
                </FormLabel>
                <FormLabel>
                    <FormInput
                        name="rating"
                        type="number"
                        placeholder="Звёзды"
                        autoComplete="rating"
                        required
                    />
                </FormLabel>
                <FormLabel>
                    <FormInput
                        name="author"
                        placeholder="Автор"
                        autoComplete="author"
                        defaultValue={name}
                        required
                    />
                </FormLabel>
                <h3>Майн</h3>
                <FormGroup>
                    <FormLabel>
                        <FormInput
                            type="radio"
                            name="mine"
                            value="ban"
                        />
                        Бан
                    </FormLabel>
                    <FormLabel>
                        <FormInput
                            type="radio"
                            name="mine"
                            value="pardon"
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
                            type="radio"
                            name="ds"
                            value="ban"
                            disabled={!user.discordId}
                        />
                        Бан
                    </FormLabel>
                    <FormLabel>
                        <FormInput
                            type="radio"
                            name="ds"
                            value="pardon"
                            disabled={!user.discordId}
                        />
                        Разбан
                    </FormLabel>
                </FormGroup>

                <ErrorMessage state={state} />

                <HookButton>
                    Добавить
                </HookButton>
            </Form>
        </Modal>
    )
}