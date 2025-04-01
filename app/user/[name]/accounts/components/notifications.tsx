import {FormBox, FormButton, FormInput, FormLabel} from "@components/formBox";
import type {User} from "lucia";
import {UpdateNotification} from "@services/user";
import {notificationsLabels} from "@/types/notification";

export function NotificationsForm({user}: { user: User }) {
    return (
        <FormBox action={async FormData => {
            "use server";
            await UpdateNotification(user._id, FormData)
        }}>
            <h3 className="center_text">
                Уведомления
            </h3>
            <p>
                Вы можете настроить<br/>
                уведомления по почте под себя
            </p>

            {notificationsLabels.map(({name, label}) => (
                <FormLabel key={name}>
                    <FormInput
                        type="checkbox"
                        name={name}
                        defaultChecked={(user.notifications as any)?.[name] !== false}
                    />
                    {label}
                </FormLabel>
            ))}

            <FormButton>
                Сохранить
            </FormButton>
        </FormBox>
    )
}