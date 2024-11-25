// React
import type {Metadata} from "next";

// Стили
import styles from "./features.module.scss"

// Компоненты
import {AnalyticsSvg, BatSvg} from "@ui/SVGS";
import {MaxSize} from "@components/maxSize";
import {GBox, GContainer, GText} from "@components/grid";
import {Url} from "@components/button";
import {Img, ImgBox} from "@components/img";
import {H1} from "@components/h1";

export const metadata: Metadata = {
    title: "Фичи",
    description: "Список всяких полезностей для более комфортной игры. Слишком полезно!"
};

export default function Features() {
    return (
        <MaxSize>
            <H1>Фичи</H1>

            <GContainer border>
                <GBox href="/features/lor" imgs="one">
                    <ImgBox type="grid">
                        <BatSvg size="100%"/>
                    </ImgBox>

                    <GText>Лор</GText>
                </GBox>

                <GBox href="/features/guides" imgs="two">
                    <ImgBox className={styles.img} type="grid">
                        <Img src="/features/guides/thinking.png" alt="Думающий чел"/>
                    </ImgBox>
                    <ImgBox className={styles.img} type="grid">
                        <Img src="/features/guides/blocks.png" alt="Блоки"/>
                    </ImgBox>

                    <GText>Гайды</GText>
                </GBox>

                <GBox href="/rules/mods" imgs="two">
                    <ImgBox className={styles.img} type="grid">
                        <Img src="/features/mods/replay_mod.png" alt="Реплей мод"/>
                    </ImgBox>
                    <ImgBox className={styles.img} type="grid">
                        <Img src="/features/mods/voice_chat.png" alt="Войс чат"/>
                    </ImgBox>

                    <GText>Моды</GText>
                </GBox>

                <GBox href={`http://map.${process.env.NEXT_PUBLIC_EN_DOMAIN}`} anotherSite imgs="one">
                    <ImgBox className={styles.img} type="grid">
                        <Img src="/features/map.png" alt="Карта"/>
                    </ImgBox>

                    <GText>Карта</GText>
                </GBox>

                <GBox anotherSite>
                    <ul className={`not_indent remove_marker ${styles.vote_box}`}>
                        <li>
                            <Url href="https://hotmc.ru/minecraft-server-259948" margin="0">
                                HotMC
                            </Url>
                        </li>
                        <li>
                            <Url href="https://minecraftrating.ru/server/minebridge" margin="0">
                                Rating
                            </Url>
                        </li>
                    </ul>

                    <GText>Голосование</GText>
                </GBox>

                <GBox href="/features/stickers" imgs="three">
                    <ImgBox className={styles.img} type="grid">
                        <Img src="/features/stickers/10.png" alt="Стикер"/>
                    </ImgBox>
                    <ImgBox className={styles.img} type="grid">
                        <Img src="/features/stickers/0.png" alt="Стикер"/>
                    </ImgBox>
                    <ImgBox className={styles.img} type="grid">
                        <Img src="/features/stickers/8.png" alt="Стикер"/>
                    </ImgBox>

                    <GText>Стикеры</GText>
                </GBox>

                <GBox href="/features/design" imgs="two">
                    <ImgBox className={styles.img} type="grid">
                        <Img src="/index/unic/heart.webp" alt="Сердце" pixel/>
                    </ImgBox>
                    <ImgBox className={styles.img} type="grid">
                        <Img src="/index/unic/calendar.webp" alt="Календарь" pixel/>
                    </ImgBox>

                    <GText>Дизайн</GText>
                </GBox>

                <GBox href="/features/analytics" imgs="one">
                    <ImgBox className={styles.img} type="grid">
                        <AnalyticsSvg size="90%"/>
                    </ImgBox>

                    <GText>Аналитика</GText>
                </GBox>

                {/*<GBox href="/features/plugins">
                    <ImgBox className={styles.img} type="grid">

                    </ImgBox>

                    // todo: плагины
                    <GText>Плагины</GText>
                </GBox>*/}
            </GContainer>
        </MaxSize>
    )
}