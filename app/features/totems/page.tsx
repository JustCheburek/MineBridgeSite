// React
import type {Metadata} from "next";

// Стили
import styles from "../features.module.scss"

// Компоненты
import {Url} from "@components/button";
import {MaxSize} from "@components/maxSize";
import {GBox, GContainer} from "@components/grid";
import {Totem} from "@components/img";
import {H1} from "@components/h1";

declare module 'csstype' {
    interface Properties {
        '--_rotate'?: string
    }
}

export const metadata: Metadata = {
    title: "Тотемы",
    description: "Оставьте свой след в истории!",
    robots: {
        index: false
    }
};

export default function Totems() {
    const totems = [
        "JustCheburek",
        "Kawa11Fox",
        "JustVayk",
        "Melissa21",
        "IIIU3A45",
        "TOXSER",
        "Pepel7",
        "JustHi_jey",
        "_rkrmv",
        "lololoshca1234",
        "KaharIRN",
        "_drdrost_",
        "ziduha_152",
        "M0vain",
        "_1drakon4ik_1",
        "fantomvip23",
        "_lakrkarBroYT",
        "Rub_Kub",
        "MarioBoi",
        "DobiFedor",
        "_Fredimine_",
        "Surglir",
        "IIeschanik29334",
        "S1erCake",
        "VeBray"
    ]

    const max_deg = 180  // Максимальный уровень наклона (от -80 до 80)

    return (
        <MaxSize>
            <H1 up paths={[
                {name: "features", displayname: "Фичи"},
                {name: "totems", displayname: "Тотемы"}
            ]}>
                Тотемы
            </H1>
            <h3 className="center_text">Версия: 2.4</h3>

            <Url href="https://modrinth.com/resourcepack/minebridge-totems/versions">
                Скачать
            </Url>

            <GContainer width={180} height={240}>
                {totems.map(totem => {
                    let file = totem.toLowerCase()

                    if (file.startsWith("_")) {
                        file = file.substring(1)
                    }

                    const rotate_deg = Math.round(Math.random() * max_deg - max_deg / 2)

                    return (
                        <GBox key={totem} className={styles.box}>
                            <Totem
                                src={`/features/totems/${file}.png`} alt={totem}
                                className={styles.img}
                                style={{'--_rotate': `${rotate_deg}deg`}}
                            />

                            <p>{totem}</p>
                        </GBox>
                    )
                })}
            </GContainer>

            <h3 className="center_text">Тоже хотите попасть в ресурс пак?</h3>
            <Url href="https://discord.gg/UEEsPXrtmV">
                Да, и что?
            </Url>
            <small className="flex_center">
                (полный список по ссылке)
            </small>
        </MaxSize>
    )
}