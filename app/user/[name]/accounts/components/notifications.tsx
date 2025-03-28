import {FormBox, FormButton, FormInput, FormLabel} from "@components/formBox";
import type {User} from "lucia";
import {UpdateNotification} from "@services/user";

export function NotificationsForm({user}: { user: User }) {
    const notificationsLabels = [
        { name: "hours", label: "Часы" },
        { name: "news", label: "Новости" },
        { name: "mostiki", label: "Мостики" },
        { name: "rating", label: "Рейтинг" },
        { name: "invite", label: "Приглашения" },
        { name: "vote", label: "Голос за сервер" }
    ]

    return (
        <FormBox action={async FormData => {
            "use server";
            await UpdateNotification(user._id, FormData)
        }}>
            <h3 className="center_text">
                Уведомления
            </h3>

            {notificationsLabels.map(({ name, label }) => (
                <FormLabel key={name}>
                    <FormInput
                        type="checkbox"
                        name={name}
                        defaultChecked={Boolean((user.notifications as any)?.[name])}
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