import {Form} from "@components/form";
import type {User} from "lucia";
import {ResetPassConsole} from "@services/console";
import { HookButton } from "@components/hookbutton";

export function PassForm({user}: { user: User }) {
    return (
        <Form action={async () => {
            "use server";
            await ResetPassConsole(user.name)
        }}>
            <h3 className="center_text">
                Сброс пароля
            </h3>
            <p>
                Можно сбросить свой пароль в майнкрафте
            </p>

            <HookButton danger>
                Сбросить
            </HookButton>
        </Form>
    )
}