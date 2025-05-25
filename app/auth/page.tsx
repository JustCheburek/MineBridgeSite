// React
import {validate} from "@/services/user/validate";
import type {Metadata} from "next";
import {redirect} from "next/navigation";

// Компоненты
import {MaxSize} from "@components/maxSize";
import {AuthForm} from "./components";
import {cookies} from "next/headers";
import {H1} from "@components/h1";
import {Policies} from "@components/footer";

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

            <div className="center_text">
                <small>
                    Регистрируясь на сервисах MineBridge,<br/>
                    Вы соглашаетесь с её политиками:
                </small>

                <Policies/>
            </div>
        </MaxSize>
    )
}
