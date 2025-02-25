// React
import type {Metadata} from "next";
import Link from "next/link";
import {getCases, getDrops} from "@/services";

// Компоненты
import {Author, Box, CaseBox, CaseInfo, Heading, Price, Section, StickerButton, Text} from "@components/shop";

// Компоненты
import {MostikiSvg} from "@ui/SVGS";
import {Url} from "@components/button";
import {Img, ImgBox} from "@components/img";
import {OnThisPage, OnThisPageLink} from "@components/sideNav";
import {H1} from "@components/h1";
import {Suspense} from "react";
import {Skeleton} from "@components/skeleton";
import {revalidateTag} from "next/cache";

export const metadata: Metadata = {
    title: "Магазин",
    description: "Мостики — внутриигровая валюта. 1 ₽ = 1 мостик. Кейсы, стикеры, всё это про нас!"
};

export default async function Shop() {
    const [Cases, Drops] = await Promise.all([getCases(), getDrops()])

    // todo: скрытие с миникарты 10 мостиков в месяц
    // todo: киты в дуэлях
    return (<>
        <div>
            <H1 up reload={async () => {
                "use server";
                revalidateTag("shop")
            }}>
                Магазин
            </H1>

            <div className="grid_center">
                <p id="mostiki">
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

            <Heading heading="Кейсы" href="/shop/case" id="cases">
                <p>
                    С помощью кейсов можно кастомизировать свой внешний вид
                </p>
                <p>
                    Тип дропа с кейсов можно изменять
                </p>
            </Heading>

            <Section name="cases">
                <Suspense fallback={<Skeleton width="100%" height={440}/>}>
                    {Cases.map(Case => (
                        <Box key={Case.name}>
                            <CaseBox Case={Case} Drops={Drops}/>
                            <Text>
                                <CaseInfo>
                                    {Case.displayname}
                                </CaseInfo>
                                <Price oldPrice={Case.oldPrice}>
                                    {Case.price}
                                </Price>
                                <Url href="/shop/case" margin="10px">
                                    Купить
                                </Url>
                            </Text>
                        </Box>
                    ))}
                </Suspense>
            </Section>

            <Heading heading="Стикеры в телеграм" id="stickers" href="/features/stickers">
                <p>
                    При покупке можно указать свой скин, пожелания, идеи,
                </p>
                <p>
                    чтобы стикер больше подходил под Вас
                </p>
            </Heading>

            <Author description="Художник-приколист" href="https://t.me/coolpilot2O1O">
                @coolpilot2O1O
            </Author>

            <Section name="stickers">
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
                        <CaseInfo description="Обычный стикер">
                            Стандарт
                        </CaseInfo>
                        <Price>
                            200
                        </Price>
                        <StickerButton/>
                    </Text>
                </Box>

                <Box>
                    <Text>
                        <CaseInfo description="Невероятно быстро">
                            Экспресс
                        </CaseInfo>
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

            <Section name="stickers">
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
                        <CaseInfo description="Абстрактные стикеры">
                            Необычные
                        </CaseInfo>
                        <Price>
                            400
                        </Price>
                        <StickerButton/>
                    </Text>
                </Box>

                <Box>
                    <Text>
                        <CaseInfo description="А где очередь?">
                            Speed UP
                        </CaseInfo>
                        <Price>
                            500
                        </Price>
                        <StickerButton/>
                    </Text>
                </Box>
            </Section>

            <Author description="Админ сервера" href="https://t.me/HomeKawa11Fox">
                @HomeKawa11Fox
            </Author>

            <Section name="stickers">
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
                        <CaseInfo description="Стикеры, но качественнее">
                            Премиум
                        </CaseInfo>
                        <Price>
                            3000
                        </Price>
                        <StickerButton/>
                    </Text>
                </Box>

                <Box>
                    <Text>
                        <CaseInfo description="Лучшие стикеры, но ещё и быстрее">
                            Делюкс
                        </CaseInfo>
                        <Price>
                            4000
                        </Price>
                        <StickerButton/>
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
        </OnThisPage>
    </>);
}