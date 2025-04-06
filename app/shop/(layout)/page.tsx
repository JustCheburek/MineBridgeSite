import type {Metadata} from "next";
import Link from "next/link";
import {getCases, getDrops} from "@/services";
import {Author, Box, Heading, Price, Section, Text} from "@components/shop"
import {CaseBoxWithModal} from "@components/caseBoxModal";
import {MostikiSvg} from "@ui/SVGS";
import {Url} from "@components/button";
import {Img, ImgBox} from "@components/img";
import {OnThisPage, OnThisPageLink} from "@components/sideNav";
import {H1} from "@components/h1";
import {Suspense} from "react";
import {Skeleton} from "@components/skeleton";
import {revalidateTag} from "next/cache";
import {LASTSHOPUPDATE} from "@/const";
import {LastUpdate} from "@components/lastUpdate";

export const metadata: Metadata = {
    title: "Магазин",
    description: "Мостики — внутриигровая валюта. 1 ₽ = 1 мостик. Кейсы, стикеры, всё это про нас!"
};

const CaseButton = () => (
    <Url href="/shop/case" margin="10px">
        Купить
    </Url>
)

const StickerButton = () => (
    <Url href="https://t.me/MineBridgeOfficial/326" margin="10px">
        Купить
    </Url>
)

const HideMeButton = () => (
    <Url href="https://discord.gg/7zx8u4rY" margin="10px">
        Купить
    </Url>
)

export default async function Shop() {
    const [Cases, Drops] = await Promise.all([getCases(), getDrops()])

    // todo: киты в дуэлях
    return (<>
        <div>
            <H1 up reload={async () => {
                "use server";
                revalidateTag("shop")
            }}>
                Магазин
            </H1>

            <div className="grid_center" id="mostiki">
                <LastUpdate time={LASTSHOPUPDATE}/>
                <p>
                    На сервере действует внутриигровая валюта <strong className="unic_color">мостики</strong>:
                </p>
                <h3 className="center_text">
                    1 ₽ = 1 <MostikiSvg/>
                </h3>
                <Url href="/shop/buy">
                    Купить
                </Url>
                <p>
                    Покупка <Link href={"#stickers"} className="unic_color"><strong>стикеров</strong></Link> {" "}
                    происходит только:
                </p>
                <ul>
                    <li>
                        В дс канале <Link
                        href="https://discord.gg/7zx8u4rY"
                        target="_blank"
                    >
                        <strong className="unic_color">
                            #покупка
                        </strong>
                    </Link>
                    </li>
                    <li>
                        У <Link
                        href="https://t.me/Kawa11Fox"
                        target="_blank"
                    >
                        <strong className="unic_color">
                            Kawa11Fox
                        </strong>
                    </Link>
                    </li>
                </ul>
            </div>

            <Heading id="cases">
                <h2 className="center_text">
                    <Link href="/shop/case">
                        Кейсы
                    </Link>
                </h2>
                <p>
                    С помощью кейсов можно<br/>
                    кастомизировать свой внешний вид
                </p>
            </Heading>

            <Section type="third">
                <Suspense fallback={<Skeleton width="100%" height={440}/>}>
                    {Cases.map(Case => (
                        <Box key={Case.name}>
                            <CaseBoxWithModal Case={Case} Drops={Drops}/>
                            <Text>
                                <h3>
                                    {Case.displayname}
                                </h3>
                                <Price oldPrice={Case.oldPrice}>
                                    {Case.price}
                                </Price>
                                <CaseButton/>
                            </Text>
                        </Box>
                    ))}
                </Suspense>
            </Section>

            <Heading id="stickers">
                <h2 className="center_text">
                    <Link href="/features/stickers">
                        Стикеры
                    </Link>
                </h2>
                <p>
                    Показывайте свой скин, пожелания и идеи,<br/>
                    чтобы телеграм стикер ещё уникальнее
                </p>
            </Heading>

            <Author description="Художник-приколист" href="https://t.me/coolpilot2O1O">
                @coolpilot2O1O
            </Author>

            <Section type="preview">
                <Box preview>
                    <Link href="/features/stickers">
                        <ImgBox hover helper overflow={false}>
                            <Img
                                src="/features/stickers/4.png" alt="Стикер"
                                width={225}
                            />
                        </ImgBox>
                    </Link>
                </Box>

                <Box>
                    <Text>
                        <h3>
                            Стандарт
                        </h3>
                        <small>
                            Обычный стикер
                        </small>
                        <Price>
                            200
                        </Price>
                        <StickerButton/>
                    </Text>
                </Box>

                <Box>
                    <Text>
                        <h3>
                            Экспресс
                        </h3>
                        <small>
                            Невероятно быстро
                        </small>
                        <Price>
                            300
                        </Price>
                        <StickerButton/>
                    </Text>
                </Box>
            </Section>

            <Author description="Абстрактный художник" href="https://t.me/Dezelink">
                @Dezelink
            </Author>

            <Section type="preview">
                <Box preview>
                    <Link href="/features/stickers">
                        <ImgBox hover helper overflow={false}>
                            <Img
                                src="/features/stickers/14.png" alt="Стикер"
                                width={225}
                            />
                        </ImgBox>
                    </Link>
                </Box>

                <Box>
                    <Text>
                        <h3>
                            Необычные
                        </h3>
                        <small>
                            Абстрактные стикеры
                        </small>
                        <Price>
                            400
                        </Price>
                        <StickerButton/>
                    </Text>
                </Box>

                <Box>
                    <Text>
                        <h3>
                            Speed UP
                        </h3>
                        <small>
                            А где очередь?
                        </small>
                        <Price>
                            500
                        </Price>
                        <StickerButton/>
                    </Text>
                </Box>
            </Section>

            <Author description="Главная лиса сервера" href="https://t.me/HomeKawa11Fox">
                @HomeKawa11Fox
            </Author>

            <Section type="preview">
                <Box preview>
                    <Link href="/features/stickers">
                        <ImgBox hover helper overflow={false}>
                            <Img
                                src="/features/stickers/13.png" alt="Стикер"
                                width={225}
                            />
                        </ImgBox>
                    </Link>
                </Box>

                <Box>
                    <Text>
                        <h3>
                            Премиум
                        </h3>
                        <small>
                            Стикеры, но качественнее
                        </small>
                        <Price>
                            3000
                        </Price>
                        <StickerButton/>
                    </Text>
                </Box>

                <Box>
                    <Text>
                        <h3>
                            Делюкс
                        </h3>
                        <small>
                            Лучшие стикеры, но ещё и быстрее
                        </small>
                        <Price>
                            4000
                        </Price>
                        <StickerButton/>
                    </Text>
                </Box>
            </Section>

            {/*<Heading id="kits">
                <h2 className="center_text">
                    Киты
                </h2>
                <p>
                    Для разнообразной игры в дуэлях
                </p>
                <h4 className="center_text">
                    В разработке
                </h4>
            </Heading>*/}

            <Heading id="hideme">
                <h2 className="center_text">
                    Где я?
                </h2>
                <p>
                    Неожиданно пропасть с карты сервера...
                </p>
            </Heading>

            <Section>
                <Box>
                    <Text>
                        <h3>
                            1 неделя
                        </h3>
                        <Price>
                            15
                        </Price>
                        <HideMeButton/>
                    </Text>
                </Box>
                <Box>
                    <Text>
                        <h3>
                            1 месяц
                        </h3>
                        <Price oldPrice={60}>
                            45
                        </Price>
                        <HideMeButton/>
                    </Text>
                </Box>
                <Box>
                    <Text>
                        <h3>
                            1 год
                        </h3>
                        <Price oldPrice={600}>
                            500
                        </Price>
                        <HideMeButton/>
                    </Text>
                </Box>
            </Section>
        </div>

        <OnThisPage>
            <OnThisPageLink href="#mostiki">
                Мостики
            </OnThisPageLink>
            <OnThisPageLink href="#cases">
                Кейсы
            </OnThisPageLink>
            <OnThisPageLink href="#stickers">
                Стикеры
            </OnThisPageLink>
            {/*<OnThisPageLink href="#kits">
                Киты
            </OnThisPageLink>*/}
            <OnThisPageLink href="#hideme">
                Где я?
            </OnThisPageLink>
        </OnThisPage>
    </>);
}