// React
import type {Metadata} from "next";
import {PropsWithChildren} from "react";
import Link from "next/link";

// Стили
import styles from "./lor.module.scss"

// Компоненты
import {MaxSize} from "@components/maxSize";
import {PBox, PText, PTitle} from "@components/post";
import {Img, ImgBox} from "@components/img";
import {H1} from "@components/h1";
import {OnThisPage, OnThisPageLink} from "@components/sideNav";
import {Number} from "@components/number";
import {LastUpdate} from "@components/lastUpdate";
import {LASTLORUPDATE} from "@/const";

export const metadata: Metadata = {
    title: "Лор",
    description: "Общая история, объединяющая сезоны!"
};

const Book = ({children}: PropsWithChildren) => (
    <div className={styles.book}>
        {children}
    </div>
)

const Page = ({children, day}: PropsWithChildren<{ day?: number | string }>) => (
    <div className={styles.page}>
        {day &&
          <p className={styles.day}>День {day}</p>
        }
        {children}
    </div>
)

export default function Lor() {
    return (
        <MaxSize sideNav>
            <div/>
            <div>
                <H1 up paths={[
                    {name: "features", displayname: "Фичи"},
                    {name: "lor", displayname: "Лор"}
                ]}>
                    Лор
                </H1>

                <h3 className="center_text">
                    <Link href="/rules#lor">Правила лора</Link>
                </h3>
                <br/>
                <LastUpdate time={LASTLORUPDATE} className="center_text"/>

                <PBox id="4">
                    <Link href="https://www.youtube.com/watch?v=IUeRmGEWUKw" target="_blank">
                        <ImgBox type="post">
                            <Img
                                src="https://i.ytimg.com/vi/IUeRmGEWUKw/maxresdefault.jpg"
                                alt="Ссылка на видео о Майнбридже"
                            />
                        </ImgBox>
                    </Link>
                    <PTitle>
                        <Link href="https://www.youtube.com/watch?v=IUeRmGEWUKw" target="_blank">
                            <h2 className="unic_color">Вампиризм</h2>
                        </Link>
                        <h4>4 сезон</h4>
                    </PTitle>
                    <PText>
                        <p className="center_text">
                            Игроки нашли в пещере дневник учёного
                        </p>
                        <Book>
                            <Page day={1}>
                                <p>Я найду их ДНК для ис???ований,</p>
                                <p>Я верю, что у меня всё получится,</p>
                                <p>Хотя эти уб???ки твер??? об обратном...</p>
                                <p>Но я ????ательно докажу, что они не ??авы!</p>
                                <p>Тогда-то они мне пов??ят!</p>
                                <p>Надо только раздобыть их об????ы..</p>
                            </Page>
                        </Book>
                        <p>
                            Открылся энд. Игроки зашли в эндер мир и встретили 2 постройки:
                        </p>
                        <ol>
                            <li>
                                В первой маленькой постройке был второй дневник, в нём было 5 страниц
                            </li>
                            <li>
                                Второй постройкой был огромный обсидиановый шар со странной красной
                                колбой внутри. Содержимое было похоже на {" "}
                                <span className="red_color medium-font">кровь</span>...
                            </li>
                        </ol>
                        <Book>
                            <Page day={36}>
                                <p>Да! Я н???нец-то раздобыл Их ДНК!</p>
                                <p>Теперь то я точно смогу Им всё до???ать!</p>
                                <p>Ха???-ха</p>
                            </Page>
                            <Page day={103}>
                                <p>Я наконец смог во??здать Их образ...</p>
                                <p>Я даже пре???тил одного жал??го челов???шку в Него... Хе-хе-хе...</p>
                                <p>Конечно есть некоторые побо??ые эффе?ты, но...</p>
                                <p>Главное, что теперь этот ?и??с полностью в моих руках!</p>
                            </Page>
                            <Page day={117}>
                                <p>О нет... Кажется Он выходит из под контроля!</p>
                                <p>Нужно срочно эваку?роват?ся!..</p>
                                <p>Иначе...</p>
                            </Page>
                            <Page day={142}>
                                <p>Чудовище! Он посягнул на жизнь своего же с??дателя!</p>
                                <p>Неблагодарный! Он должен был быть счастлив, став Им!</p>
                                <p>Но Он воспроти??лся и почти уничтожил всё, что я создал!</p>
                                <p>Ха-ха! Главное, что я доказал всем этим н?учам, чего я стою!</p>
                                <p>Теперь Он ни к чему...</p>
                                <p>К тому же, Он опасен для моей жизни!</p>
                                <p>Если его не уни?тожить, то я одной рукой не отделаюсь...</p>
                                <p>Но уничтожать такой драгоценный ??рус будет грехом...</p>
                                <p>Хе-хе... Тогда я спрячу его там, где никто не на?дёт!</p>
                            </Page>
                        </Book>

                        <p>
                            Колбу сразу взяли игроки, но использовали только спустя несколько часов.
                            Выпив содержимое, у игроков кружилась голова с быстрой потерей крови
                        </p>
                        <br/>
                        <h4>Игроки поделились на 2 группы</h4>
                        <ol>
                            <li>Которые съедали обычную еду, и сразу лечились</li>
                            <li>Которые ждали, постепенно превращаясь в вампиров</li>
                        </ol>
                        <br/>
                        <h4>
                            Вампиры:
                        </h4>
                        <ul>
                            <li>
                                Горели на солнце
                            </li>
                            <li>
                                Ели живых существ
                            </li>
                            <li>
                                Могли превращаться в летучих мышей
                            </li>
                        </ul>
                        <br/>
                        <p>
                            Противостояние было долгим, некоторые игроки заражались и сразу пытались лечится.
                            Было целых 3 фазы вампиризма, на каждой лекарство было разным:
                        </p>
                        <ol>
                            <li>
                                Любая человеческая еда
                            </li>
                            <li>
                                Мистическая похлёбка
                            </li>
                            <li>
                                Чесночная водичка - уникальный предмет, состоящий из бутылки, лук батуна и слезы гаста
                            </li>
                        </ol>
                        <br/>
                        <p>
                            Вампиризм закончился резко, возможно в будущем вы получите объяснение
                        </p>
                    </PText>
                </PBox>

                <PBox id="5">
                    <PTitle>
                        <h2 className="unic_color">Учёный</h2>
                        <h4>5 сезон</h4>
                    </PTitle>
                    <PText>
                        <p>
                            Игроки нашли лабораторию с разбросанными бумагами и книгами, из них можно понять
                        </p>
                        <ul>
                            <li>
                                Владелец лаборатории - Демиан Росси
                            </li>
                            <li>
                                Ему на момент написания 23 года, он 1919 года рождения
                            </li>
                            <li>
                                Он проработал 2 года археологом
                            </li>
                            <li>
                                Он что-то очень сильно хотел найти, изучал досконально каждую свою археологическую цель
                            </li>
                            <li>
                                Что-то натворил со своей последней целью, что-то невозвратное...
                            </li>
                        </ul>
                        <br/>
                        <p>
                            После игроки нашли эту цель, это была структура очень напоминающая замок, в центре была
                            найдена брошенная книга и бочка, внутри лежала поддельная рука вампира и тёмная кровь...
                        </p>
                        <Book>
                            <Page>
                                <p>Уважаемый, Демиан Росси!</p>
                            </Page>
                            <Page>
                                <p>
                                    По результатам рассмотрения полученной от Вас просьбы на проведение исследований с
                                    найденным экземпляром вынуждены сообщить Вам о своем отказе.
                                </p>
                            </Page>
                            <Page>
                                <p>
                                    Найденные при раскопках предметы не подлежат передаче третьим лицам.
                                    Их мы обязаны отдавать в музей или на экспертизу к профессионалам.
                                </p>
                            </Page>
                            <Page>
                                <p>
                                    С уважением,
                                </p>
                                <p>
                                    Начальник отдела частной археологической организации «Корни»
                                </p>
                                <p>
                                    Модулев А. Д.
                                </p>
                            </Page>
                        </Book>
                        <br/>
                        <p>После открытия энда игрокам стала доступна ещё одна книга</p>
                        <Book>
                            <Page day={993}>
                                Я всего лишь хотел спастись от этого чудов?ща, но Он унич?ожил всё что было!
                            </Page>
                            <Page day={"100?"}>
                                Надо вернутся и <strong className="red_color">отомстить</strong> ему!
                            </Page>
                        </Book>
                    </PText>
                </PBox>

                <PBox id="6">
                    <Link href="/video">
                        <ImgBox type="post">
                            <Img
                                src="https://i.ytimg.com/vi/XavIL238_FA/maxresdefault.jpg"
                                alt="Ссылка на видео о Майнбридже"
                            />
                        </ImgBox>
                    </Link>

                    <PTitle>
                        <Link href="/video">
                            <h2 className="unic_color">Битва</h2>
                        </Link>
                        <h4>6 сезон</h4>
                    </PTitle>

                    <PText>
                        <p>
                            Игроки нашли лабораторию из 5 сезона в адском стиле в аду
                        </p>
                        <p>
                            В ней была загадка, нужно было перейти по ссылке:
                        </p>
                        <h4>
                            <Link href="/video" className="unic_color medium-font">
                                {process.env.NEXT_PUBLIC_RU_DOMAIN}/video
                            </Link>
                        </h4>
                        <br/>
                        <p>
                            После открытия энда игроки нашли прогнившую маленькую постройку с 4 сезона
                        </p>
                        <p>
                            В ней была книга с доступом к камере учёного
                        </p>
                        <h4>
                            <Link href="/scientist" className="unic_color medium-font">
                                {process.env.NEXT_PUBLIC_RU_DOMAIN}/scientist
                            </Link>
                        </h4>
                    </PText>
                </PBox>
                <PBox id="7">
                    <PTitle>
                        <h2 className="unic_color">Демиан</h2>
                        <h4>7 сезон</h4>
                    </PTitle>
                    <PText>

                    </PText>
                </PBox>
            </div>
            <OnThisPage>
                <OnThisPageLink href="#4">
                    <Number>4</Number>
                    Вампиризм
                </OnThisPageLink>
                <OnThisPageLink href="#5">
                    <Number>5</Number>
                    Учёный
                </OnThisPageLink>
                <OnThisPageLink href="#6">
                    <Number>6</Number>
                    Битва
                </OnThisPageLink>
                <OnThisPageLink href="#7">
                    <Number>7</Number>
                    Демиан
                </OnThisPageLink>
            </OnThisPage>
        </MaxSize>
    )
}