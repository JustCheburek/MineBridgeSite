// Сервер
import type {Metadata} from "next";
import {permanentRedirect} from "next/navigation";
import {validate} from "@services/validate";
import {cookies} from "next/headers";
import {lucia} from "@server/lucia";

// Компоненты
import {MostikiSvg, SBPSvg} from "@ui/SVGS";
import Link from "next/link";
import {PBox, PText, PTitle} from "@components/post";
import {OnThisPage, OnThisPageHeading, OnThisPageLink} from "@components/sideNav";
import {H1} from "@components/h1";

export const metadata: Metadata = {
    title: "Покупка",
    description: "Покупка мостиков с помощью СБП. 1₽ = 1 мостик. Подержите нас донатиком, пж!",
    openGraph: {
        title: "Покупка",
        description: "Покупка мостиков с помощью СБП. 1₽ = 1 мостик. Подержите нас донатиком, пж!",
    },
    twitter: {
        title: "Покупка",
        description: "Покупка мостиков с помощью СБП. 1₽ = 1 мостик. Подержите нас донатиком, пж!",
    }
}

export default async function Component() {
    const {user} = await validate(cookies().get(lucia.sessionCookieName)?.value)

    if (!user) {
        return permanentRedirect("/auth")
    }

    return (<>
        <div className="center_text">
            <H1>
                Покупка
            </H1>
            <h3 id="mostiki">
                1 ₽ = 1 <MostikiSvg/>
            </h3>

            <h4>
                Для покупки позовите {" "}
                <Link
                    href="https://discord.gg/f95V9Rezqy"
                    className="unic_color medium-font" target="_blank"
                >
                    админа
                </Link>
            </h4>

            <PBox id="sbp">
                <PTitle>
                    <h2 className="unic_color">СБП</h2>
                </PTitle>
                <PText className="center_text">
                    <h4 className="all_select green_color">
                        СберБанк
                    </h4>
                    <h4 className="all_select">
                        8 914 344 8578
                    </h4>
                </PText>
            </PBox>

            <PBox id="sber">
                <PTitle>
                    <Link
                        href="https://www.sberbank.com/sms/pbpn?requisiteNumber=79143448578"
                        target="_blank" className="unic_color"
                    >
                        <h2>СБЕР</h2>
                    </Link>
                </PTitle>
                <PText>
                    <Link
                        href="https://www.sberbank.com/sms/pbpn?requisiteNumber=79143448578"
                        target="_blank"
                    >
                        <SBPSvg size="15rem"/>
                    </Link>
                </PText>
            </PBox>

            <PBox id="donationAlerts">
                <PTitle>
                    <Link
                        href="https://www.donationalerts.com/r/kawa11fox"
                        target="_blank" className="unic_color"
                    >
                        <h2>Donation Alerts</h2>
                    </Link>
                </PTitle>
                <PText>
                    <Link
                        href="https://www.donationalerts.com/r/kawa11fox"
                        target="_blank"
                    >
                        Комиссию оплачиваете Вы
                    </Link>
                </PText>
            </PBox>
        </div>

        <OnThisPage>
            <OnThisPageHeading>
                Содержание
            </OnThisPageHeading>
            <OnThisPageLink href="#mostiki">
                Цена
            </OnThisPageLink>
            <OnThisPageLink href="#sbp">
                СБП
            </OnThisPageLink>
            <OnThisPageLink href="#sber">
                Сбер
            </OnThisPageLink>
            <OnThisPageLink href="#donationAlerts">
                Donation Alerts
            </OnThisPageLink>
        </OnThisPage>
    </>)
}
