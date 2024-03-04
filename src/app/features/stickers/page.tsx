// React
import type {Metadata} from "next";

// Компоненты
import {Url} from "@components/button";
import {RelativeNav} from "@components/relativeNav";
import {MaxSize} from "@components/maxSize";
import {Img, ImgBox} from "@components/img";
import {GContainer} from "@components/grid";

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

                <GContainer width={200} height={200}>
                    {
                        Array(14).fill(null).map((_, sticker) => {
                            let path = `/features/stickers/${sticker}.png`

                            return (
                                <ImgBox key={sticker} hover={1.1}>
                                    <Img src={path} alt="стикер" width={200} height={200}/>
                                </ImgBox>
                            )
                        })
                    }
                </GContainer>

                <h3 className="center_text">Тоже хотите попасть в стикер пак?</h3>
                <Url href="https://t.me/MineBridgeOfficial/326">
                    Да, и что?
                </Url>
            </MaxSize>
        </main>
    )
}
