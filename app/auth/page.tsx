// React
import {validate} from "@services/validate";
import type {Metadata} from "next";
import {redirect} from "next/navigation";

// Компоненты
import {MaxSize} from "@components/maxSize";
import {AuthForm} from "./components";
import {cookies} from "next/headers";
import {H1} from "@components/h1";
import Link from "next/link";

export const metadata: Metadata = {
    title: "Регистрация",
    description: "Нужен лишь гугл, дискорд или твич и ты уже на сервере!"
};

export default async function Auth() {
    const cookiesStore = await cookies()
    const {user} = await validate()

    if (user) {
        return redirect(`/user/${user.name}`)
    }

    const savedName = cookiesStore.get("name")?.value

    return (
        <MaxSize className="grid_center">
            <H1>Введи ник</H1>
            <p className="center_text">
                Ты уже близко к цели!
            </p>

            <AuthForm savedName={savedName}/>

            <div>
                <small>
                    Регистрируясь на сервисах MineBridge<br/>
                    Вы безусловно соглашаетесь с:
                </small>
                <ul>
                    <li>
                        <small>
                            <Link href="/rules/privacy-policy" className="unic_color medium-font">
                                Пользовательским соглашением
                            </Link>
                        </small>
                    </li>
                    <li>
                        <small>
                            <Link href="/rules/privacy-policy" className="unic_color medium-font">
                                Политикой конфиденциальности
                            </Link>
                        </small>
                    </li>
                </ul>
            </div>
        </MaxSize>
    )
}
