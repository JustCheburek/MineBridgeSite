import type {Metadata} from "next";
import {redirect} from "next/navigation";
import {validate} from "@services/user/validate";
import {MostikiSvg} from "@ui/SVGS";
import {H1} from "@components/h1";
import {TextUrl} from "@components/textUrl";
import {PaymentForm} from "@app/shop/(layout)/buy/components";

export const metadata: Metadata = {
    title: "Покупка",
    description: "Покупка мостиков: 1₽ = 1 мостик. Подержите нас донатиком, пж!"
}

export default async function Component() {
    const {user} = await validate()

    if (!user) {
        return redirect("/auth")
    }

    return (
        <div className="grid_center">
            <H1>
                Покупка
            </H1>
            <h3 id="mostiki" className="center_text">
                1 ₽ = 1 <MostikiSvg/>
            </h3>

            <PaymentForm user={user}/>

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
        </div>
    )
}
