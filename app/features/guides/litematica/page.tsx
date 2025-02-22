// React
import type {Metadata} from "next";

// Компоненты
import {MaxSize} from "@components/maxSize";
import {H1} from "@components/h1";
import {PBox, PText, PTitle} from "@components/post";
import Link from "next/link";
import {Img, ImgBox, type ImgBoxProps} from "@components/img";
import styles from "./litematica.module.scss";
import type {PropsWithChildren} from "react";
import {OnThisPage, OnThisPageLink} from "@components/sideNav";

export const metadata: Metadata = {
    title: "Litematica",
    description: "Можно быстро и понятно влится в лайтматику!"
};

const Video = ({name, children, ...props}: PropsWithChildren<{ name: string }> & ImgBoxProps) => {
    return (
        <ImgBox type="post" {...props}>
            <video
                src={`/features/guides/litematica/${name}_converted.mp4`}
                autoPlay muted loop
                className={styles.video}
            >
                <p>
                    {children}
                </p>
            </video>
        </ImgBox>
    )
}

export default function Litematica() {
    return (
        <MaxSize sideNav>
            <div/>
            <div>
                <H1 paths={[
                    {name: "features", displayname: "Фичи"},
                    {name: "guides", displayname: "Гайды"},
                    {name: "Litematica", displayname: "Litematica"}
                ]}>
                    Litematica
                </H1>

                <PBox id="download">
                    <PTitle>
                        <Link
                            href="https://www.curseforge.com/minecraft/mc-mods/litematica"
                            target="_blank"
                        >
                            <h2>Скачивание</h2>
                        </Link>
                    </PTitle>

                    <PText>
                        <ul>
                            <li>
                                Скачиваем{" "}
                                <Link
                                    href="https://www.curseforge.com/minecraft/mc-mods/litematica"
                                    target="_blank"
                                    className="unic_color"
                                >
                                    Litematica
                                </Link>
                            </li>
                            <li>
                                Закидываем в папку .minecraft/mods
                            </li>
                            <li>
                                Запускаем майн
                            </li>
                        </ul>
                    </PText>
                </PBox>

                <PBox id="select">
                    <Video name="select">
                        Выделение схемы
                    </Video>

                    <PTitle>
                        <h2>Выделение</h2>
                    </PTitle>

                    <PText>
                        <h4>С помощью палочки</h4>
                        <ul>
                            <li>
                                Выберите на палочке первый режим <code>Выбор области</code>
                            </li>
                            <li>
                                Зажимайте <code>Alt</code>
                            </li>
                            <li>
                                Вращайте колёсико мыши, смотря в нужную сторону
                            </li>
                        </ul>
                        <br/>
                        <p>
                            Чтобы поменять угол нажмите среднюю кнопку мыши по другому углу
                        </p>
                        <br/>
                        <h4>
                            С помощью координат
                        </h4>
                        <ul>
                            <li>
                                <code>
                                    Редактор области
                                </code>
                            </li>
                            <li>
                                Вводите координаты для 2 углов
                            </li>
                        </ul>
                    </PText>
                </PBox>

                <PBox id="save">
                    <Video name="save">
                        Сохранение
                    </Video>

                    <PTitle>
                        <h2>Сохранение</h2>
                        <small>Сохранение схемы в файл</small>
                    </PTitle>

                    <PText>
                        <ul>
                            <li>
                                <code>Редактор области</code>
                            </li>
                            <li>
                                <code>
                                    Сохранить схему
                                </code>
                            </li>
                            <li>
                                Введите название схемы
                            </li>
                            <li>
                                <code>Сохранить схему</code>
                            </li>
                        </ul>
                    </PText>
                </PBox>

                <PBox id="place">
                    <Video name="place">
                        Размещение
                    </Video>

                    <PTitle>
                        <h2>Размещение</h2>
                        <small>Загрузка схемы в мир</small>
                    </PTitle>

                    <PText>
                        <ul>
                            <li>
                                <code>
                                    Загрузить схему
                                </code>
                            </li>
                            <li>
                                Выберите нужную схему
                            </li>
                            <li>
                                <code>
                                    Загрузить схему
                                </code>
                            </li>
                        </ul>
                        <br/>
                        <p>
                            Для перемещения схемы:
                        </p>
                        <ul>
                            <li>
                                Выбираете второй режим на палочке
                            </li>
                            <li>
                                Зажимайте <code>Alt</code>
                            </li>
                            <li>
                                Вращайте колёсико мыши, смотря в нужную сторону
                            </li>
                            <li>
                                Или нажимайте <code>ПКМ</code> по блокам
                            </li>
                        </ul>
                    </PText>
                </PBox>

                <PBox id="layers">
                    <PTitle>
                        <h2>Режимы слоёв</h2>
                    </PTitle>

                    <PText>
                        <p>
                            <code>Настройки</code> → <code>Отображение слоёв</code>{" "}
                            <small>(или <code>M</code> + <code>PageUp</code>)</small>
                        </p>
                        <small>
                            Можно настраивать по координатам X, Y и Z
                        </small>
                        <br/>
                        <ol>
                            <li>
                                Все слои
                            </li>
                            <li>
                                Один слой
                            </li>
                            <li>
                                “Отрезки”
                            </li>
                            <li>
                                Ниже определённой координаты
                            </li>
                            <li>
                                Выше определённой координаты
                            </li>
                        </ol>
                    </PText>
                </PBox>

                <PBox id="easyplace">
                    <Video name="easyplace">
                        Easy place mode
                    </Video>

                    <ImgBox type="post" borderRadius={false}>
                        <Img src="/features/guides/litematica/easyplace.webp"
                             alt="Бинд easy place mode"/>
                    </ImgBox>

                    <PTitle>
                        <h2>EasyPlaceMode</h2>
                        <small>Ускорение строительства</small>
                    </PTitle>

                    <PText>
                        <ul>
                            <li>
                                <code>
                                    Настройки
                                </code>
                            </li>
                            <li>
                                <code>
                                    Клавиши
                                </code>
                            </li>
                            <li>
                                <code>
                                    easyPlaceToggle
                                </code>
                            </li>
                            <li>
                                Забиндите на удобную клавишу
                            </li>
                        </ul>
                    </PText>

                    <ImgBox type="post" borderRadius={false}>
                        <Img src="/features/guides/litematica/pickBlockableSlots.webp"
                             alt="Автовыбор блоков для easy place mode"/>
                    </ImgBox>

                    <PTitle>
                        <h3>Автовыбор блоков</h3>
                    </PTitle>

                    <PText>
                        <ul>
                            <li>
                                <code>
                                    Основные
                                </code>
                            </li>
                            <li>
                                <code>
                                    pickBlockableSlots
                                </code>
                            </li>
                            <li>
                                Дописывайте все слоты до 9
                            </li>
                        </ul>
                        <br/>
                        <p>
                            При активации бинда включится <code>EasyPlace</code>,
                            который автоматически будет выбирать в слотах нужные блоки
                        </p>
                    </PText>
                </PBox>

                <PBox id="glow">
                    <Video name="glow">
                        Подсветка лишних блоков
                    </Video>

                    <PTitle>
                        <h2>Подсветка блоков</h2>
                        <small>Подсветка неверных состояний блоков</small>
                    </PTitle>

                    <PText>
                        <ul>
                            <li>
                                <code>
                                    Размещение схемы
                                </code>
                            </li>
                            <li>
                                <code>
                                    Проверка схемы
                                </code>
                            </li>
                            <li>
                                Выбираете типы проверок
                            </li>
                            <li>
                                <code>
                                    Запустить проверку
                                </code>
                            </li>
                            <li>
                                Выбираем блоки
                            </li>
                            <li>
                                Проверяем блоки в самой схеме
                            </li>
                        </ul>
                    </PText>
                </PBox>

                <PBox id="paste">
                    <ImgBox type="post" borderRadius={false}>
                        <Img src="/features/guides/litematica/executeOperation.webp"
                             alt="Обязательная настройка для вставки"/>
                    </ImgBox>

                    <PTitle>
                        <h2>Вставка схемы</h2>
                        <small>Нужно иметь права/креатив</small>
                    </PTitle>

                    <PText>
                        <p>
                            <code>Настройки</code> → <code>Клавиши</code> → <code>executeOperation</code>
                        </p>
                        <ul>
                            <li>
                                Забиндите на удобную клавишу
                            </li>
                            <li>
                                Выберите на палочке пятый режим
                            </li>
                            <li>
                                Нажмите бинд
                            </li>
                        </ul>
                    </PText>
                    <ImgBox type="post" borderRadius={false}>
                        <Img src="/features/guides/litematica/pasteReplaceBehavior.webp"
                             alt="Обязательная настройка для вставки"/>
                    </ImgBox>
                    <PTitle>
                        <h3><code>PasteReplaceBehavior</code></h3>
                        <small>(во вкладке <code>Основные</code>)</small>
                    </PTitle>
                    <PText>
                        <p>
                            Определяет что делать с блоками, которые мешают вставке схемы
                        </p>
                        <ul>
                            <li>
                                <p>
                                    Вся схема <small>(рекомендуемо)</small>
                                </p>
                            </li>
                            <li>
                                <p>
                                    Исключить воздух
                                </p>
                            </li>
                            <li>
                                <p>
                                    Не заменять блоки
                                </p>
                            </li>
                        </ul>
                    </PText>
                    <Video name="paste" borderRadius="down">
                        Вставка схемы
                    </Video>
                </PBox>
            </div>
            <OnThisPage>
                <OnThisPageLink href="#download">
                    Скачивание
                </OnThisPageLink>
                <OnThisPageLink href="#select">
                    Выделение
                </OnThisPageLink>
                <OnThisPageLink href="#save">
                    Сохранение
                </OnThisPageLink>
                <OnThisPageLink href="#place">
                    Размещение
                </OnThisPageLink>
                <OnThisPageLink href="#layers">
                    Режимы слоёв
                </OnThisPageLink>
                <OnThisPageLink href="#easyplace">
                    Easy Place
                </OnThisPageLink>
                <OnThisPageLink href="#glow">
                    Подсветка блоков
                </OnThisPageLink>
                <OnThisPageLink href="#paste">
                    Вставка
                </OnThisPageLink>
            </OnThisPage>
        </MaxSize>
    )
}