"use client";

// Компоненты
import { Modal, type setModal } from "@components/modal";
import { Form, FormInput, FormLabel } from "@components/form";
import { H1 } from "@components/h1";
import type { User } from "lucia";
import { MostikiSvg } from "@ui/SVGS";
import { GiveGift } from "@services/user/gift";
import { useActionStateId } from "@/hooks/useActionStateId";
import { HookButton } from "@components/hookbutton";
import { ErrorMessage } from "@components/error";

type GiftModalProps = {
    modal: boolean
    setModal: setModal
    user: User
    author: User
}

export function GiftModal({
    user, author,
    modal, setModal
}: GiftModalProps) {
    const [state, formAction] = useActionStateId(
        GiveGift,
        { success: true, data: { _id: user._id, authorId: author._id } }
    );

    return (
        <Modal setModal={setModal} modal={modal}>
            <H1>
                Перевод
            </H1>
            <h2>
                {user.name}
            </h2>

            <Form
                action={formAction} 
                onSubmit={() => 
                    state.success && setModal(false)
                }
            >
                <p>
                    Твой баланс: {author.mostiki} <MostikiSvg />
                </p>

                <FormLabel>
                    <FormInput
                        type="number"
                        name="mostiki"
                        placeholder="Мостики"
                        max={author.mostiki}
                        autoComplete="mostiki"
                    />
                </FormLabel>

                <ErrorMessage state={state} />

                <HookButton>
                    Перевести
                </HookButton>
            </Form>
        </Modal>
    )
}