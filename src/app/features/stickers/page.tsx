// React
import type {Metadata} from "next";

// Стили
import "./styles/stickers.scss"

// Компоненты
import {Url} from "@components/button";
import {RelativeNav} from "@components/relativeNav";
import {MaxSize} from "@components/maxSize";

export const metadata: Metadata = {
    title: "Стикеры | Майнбридж",
    description: "Можно добавить себе в телеграм. Нарисованы руками игроков сервера!",
};

export default function Stickers() {
    return (
        <main className="stickers">
            <MaxSize>
                <RelativeNav paths={[{name: "features", displayname: "Фичи"}, {name: "stickers", displayname: "Стикеры"}]}/>
                <h1>ТГ Cтикеры</h1>
                <p className="center_text">Стикеры в телеграме на заказ</p>

                <Url href="https://t.me/addstickers/MineBridge">
                    Добавить
                </Url>

                <div className="container">
                    {
                        Array(14).fill(null).map((_, sticker) => {
                            let path = `/media/features/stickers/${sticker}.png`

                            return (
                                <div className="box" key={sticker}>
                                    <img src={path} alt="стикер" className="img_box" loading="lazy"/>
                                </div>
                            )
                        })
                    }
                </div>

                <h3 className="center_text">Тоже хотите попасть в стикер пак?</h3>
                <Url href="https://t.me/MineBridgeOfficial/326">
                    Да, и что?
                </Url>
            </MaxSize>
        </main>
    )
}
