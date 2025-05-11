import {H1} from "@components/h1";
import {TextUrl} from "@components/textUrl";
import {Url} from "@components/button";
import {validate} from "@services/validate";
import {redirect} from "next/navigation";

export default async function Success() {
    const {user} = await validate()

    if (!user) {
        return redirect("/auth")
    }

    return (
        <div className="grid_center">
            <H1>
                Успешно
            </H1>
            <div>
                <p>
                    Мостики выдаются автоматически в течение нескольких минут
                </p>
                <p>
                    Если есть вопросы, задавайте:{" "}
                    <TextUrl href="https://t.me/JustCheburek">JustCheburek</TextUrl>{" "}
                    <TextUrl href="https://t.me/Dezelink">Dezelink</TextUrl>
                </p>
            </div>
            <Url href={`/user/${user.name}`}>
                Профиль
            </Url>
        </div>
    )
}