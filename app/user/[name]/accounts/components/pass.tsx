import {FormBox, FormButton} from "@components/formBox";
import type {User} from "lucia";
import {ResetPassConsole} from "@services/console";

export function PassForm({user}: { user: User }) {
    return (
        <FormBox action={async () => {
            "use server";
            await ResetPassConsole(user.name)
        }}>
            <h3 className="center_text">
                Сброс пароля
            </h3>
            <p>
                Можно сбросить свой пароль в майнкрафте
            </p>

            <FormButton danger>
                Сбросить
            </FormButton>
        </FormBox>
    )
}