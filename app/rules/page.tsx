// React
import type {Metadata} from "next";
import Link from "next/link";
import {LASTRULESUPDATE} from "@/const";

// Стили
import styles from './rules.module.scss';

// Компоненты
import {Punishment, Rule, RulesBox} from "@components/rules";
import {OnThisPage, OnThisPageLink} from "@components/sideNav";
import {TextUrl} from "@components/textUrl";
import {H1} from "@components/h1";
import {Number} from "@components/number";
import {LastUpdate} from "@components/lastUpdate";

export const metadata: Metadata = {
    title: "Правила",
    description: "Звёзды — внутриигровая награда или наказание. Суды, баны, всё это про нас!"
};

export default function Rules() {
    return (<>
        <div className="rules_content">
            <H1 up>Правила</H1>
            <LastUpdate time={LASTRULESUPDATE}/>
            <div className={styles.tldr}>
                <div className="center_text">
                    <h2 className="red_color">
                        НEЛЬЗЯ
                    </h2>
                    <small>
                        Краткие правила
                    </small>
                </div>

                <div className={styles.tldr_box}>
                    <div>
                        <h4>В общении:</h4>
                        <ul>
                            <li>
                                Говорить{" "}
                                <Link href="/rules/blacklist" className="unic_color medium-font">бан-ворды</Link>
                            </li>
                            <li>
                                Оскорблять
                            </li>
                            <li>
                                Часто матерится
                            </li>
                            <li>
                                Рекламировать конкурентов
                            </li>
                        </ul>
                    </div>
                    <div>
                        <h4>В игре:</h4>
                        <ul>
                            <li>
                                Убивать
                            </li>
                            <li>
                                Мешать другим игрокам
                            </li>
                            <li>
                                Гриферить
                            </li>
                            <li>
                                Читерить
                            </li>
                        </ul>
                    </div>
                </div>
            </div>

            <RulesBox name="terms" heading="Термины" number={0}>
                <Rule number={0.1}>
                    Термины используются в том же значении, что и в{" "}
                    <Link
                        href="/rules/terms-of-use"
                        className="unic_color medium-font"
                    >
                        пользовательском соглашении
                    </Link>
                </Rule>
                <Rule number={0.2}>
                    «Бан» — блокировка доступа пользователя к сервисам MineBridge
                </Rule>
                <Rule number={0.3}>
                    <p>
                        «Звёзды» — рейтинг игрового аккаунта, чем выше рейтинг, тем больше бонусов от сервера
                    </p>
                    <ul id="social" className="remove_marker">
                        <li>
                            <span className="green_color medium-font">25 и больше</span> — особые призы на {" "}
                            <Link href="/milkyway" className="unic_color medium-font">млечном пути</Link>
                        </li>
                        <li>
                            <span className="red_color medium-font">-200 и ниже</span> — бан в майне
                        </li>
                        <li>
                            <span className="red_color medium-font">-300 и ниже</span> — бан в дс
                        </li>
                    </ul>
                </Rule>
                <Rule number={0.4}>
                    «Игрок» — участник игрового сервера MineBridge
                </Rule>
                <Rule number={0.5}>
                    <Link
                        href="https://www.minecraft.net/ru-ru/article/what-is-minecraft-skin"
                        target="_blank"
                        className="medium-font unic_color"
                    >
                        «Скин»
                    </Link> — визуальная составляющая игрока
                </Rule>
                <Rule number={0.6}>
                    Все{" "}
                    <Link
                        href="/rules/roles"
                        className="medium-font unic_color"
                    >
                        «роли»
                    </Link>,
                    осуществляющие действия против нарушителя, включают в себя саму роль и все вышестоящие<br/>
                    <small>(т.е. судья — это судья, модератор или администратор)</small>
                </Rule>
                <Rule number={0.7}>
                    <p>
                        «Админ» — администратор MineBridge
                    </p>
                    <p>
                        «Модер» — модератор MineBridge
                    </p>
                </Rule>
            </RulesBox>

            <RulesBox name="general" heading="Общие правила" number={1}>
                <Rule number={1.1}>
                    Незнание правил и их обновлений не освобождает от ответственности наказаний
                </Rule>
                <Rule number={1.2}>
                    Ответственность всегда несет владелец аккаунта, независимо от того, кто совершал действия под данным
                    аккаунтом
                </Rule>
                <Rule number={1.3}>
                    Любые попытки обхода блокировок категорически запрещены и будут приводить к продлению и изменению их
                    типа на более строгий.
                </Rule>
                <Rule number={1.4}>
                    Правила действуют не зависимо от стримов, видео, кланов и других факторов
                </Rule>
                <Rule number={1.5} stars={100}>
                    Запрещена выдача себя за другого человека.
                </Rule>
            </RulesBox>

            <RulesBox name="communication" heading="Общение" number={2}>
                <Rule number={2.1} stars={50}>
                    Любые формы оскорблений запрещены
                </Rule>
                <Rule number={2.2} stars={15}>
                    Для определённых сообщений существуют свои каналы<br/>
                    <small>(репорты в #репорты, баги в #тех-поддержка)</small>
                </Rule>
                <Rule number={2.3} stars={15}>
                    Спам и флуд запрещены
                </Rule>
                <Rule number={2.4} text="Бан">
                    Контент{" "}
                    <Link href="https://ru.wikipedia.org/wiki/NSFW"
                          target="_blank"
                          className="medium-font unic_color"
                    >
                        NSFW
                    </Link> (18+ и т. п.) запрещен
                </Rule>
                <Rule number={2.5} stars={35}>
                    Запрещено нарушение правил{" "}
                    <TextUrl href="https://legal.twitch.com/ru/legal/terms-of-service/">
                        платформы Twitch
                    </TextUrl><br/>
                    <Link href="/rules/blacklist" className="unic_color medium-font">Список запрещённых выражений</Link>
                </Rule>
                <Rule number={2.6} stars={20}>
                    Мат не приветствуется, череда матов = наказание
                </Rule>
                <Rule number={2.7} text="Бан">
                    Запрещён деанон, доксинг, манипуляция, слив личных данных без разрешения
                </Rule>
            </RulesBox>

            <RulesBox name="game_interferences" heading="Игровые помехи" number={3}>
                <Rule number={3.1} stars={30}>
                    Запрещена ходьба перед игроком, ломание блоков под или перед ним, стрельба
                    любым видом снарядов в игрока
                </Rule>
                <Rule number={3.2} text="Суд">
                    <p>Пранки должны:</p>
                    <ul>
                        <li>
                            Быть безобидны
                        </li>
                        <li>
                            Или иметь бо́льший приз, чем потерянное или испорченное имущество игрока, попавшего
                            под пранк
                        </li>
                        <li>
                            Или иметь согласие помогаторов
                        </li>
                    </ul>
                </Rule>
                <Rule number={3.3} text="Суд">
                    <p>Убийства должны:</p>
                    <ul>
                        <li>
                            Иметь согласие у двух сторон
                        </li>
                        <li>
                            Или иметь согласие админов
                        </li>
                        <li>
                            Удостоверьтесь, что пвп арена имеет письменный договор от одного из судий, иначе вы можете
                            понизить свои звёзды за участие в неофициальной пвп арене{" "}
                            <TextUrl
                                href="https://discord.gg/f95V9Rezqy"
                            >
                                Получить согласие
                            </TextUrl>
                        </li>
                    </ul>
                </Rule>
            </RulesBox>

            <RulesBox name="areas" heading="Территории" number={4}>
                <Rule number={4.1}>
                    <p>Чтобы занять территорию вы должны:</p>

                    <ul>
                        <li>
                            Оградить её любым заметным видом блоков {" "}
                            <small>(таблички, доски, шерсть, кальцит или адские блоки)</small>
                        </li>
                        <li>
                            Поставить таблички с ником или кланом владельцем
                        </li>
                    </ul>
                </Rule>
                <Rule number={4.2}>
                    <p>
                        На территориях, занимаемых игроками или имеющих признаки проживания игроков {" "}
                        <small>(если игрок не успел оградить территорию)</small>
                    </p>

                    <br/>

                    <p>
                        <span className="green_color medium-font">Разрешено</span>:
                    </p>
                    <ul>
                        <li>
                            Приходить в гости, заходить и гулять по территории, если нет табличек с запретом на вход
                        </li>
                    </ul>

                    <br/>

                    <p>
                        <span className="red_color medium-font">Запрещено</span>:
                    </p>
                    <ul>
                        <li>
                            Гриферить. Штраф: возврат ресурсов или компенсация алмазами{" "}
                            <small>(по рыночной цене)</small> + моральная компенсация 5 алмазов
                            <Punishment text="От владельца (не больше x2)" stars={40}/>
                        </li>
                        <li>
                            Строить, ломать и изменять блоки. За собой необходимо чинить взрывы от криперов
                            <Punishment text="Починка или штраф от 8 алмазов" stars={30}/>
                        </li>
                        <li>
                            Убивать мирных и нейтральных существ.
                            А также враждебных существ, у которых есть признаки, что этот моб нужен{" "}
                            <small>
                                (используются в фермах, механизмах; окружены блоками)
                            </small>
                            <Punishment text="От владельца" stars={20}/>
                        </li>
                        <li>
                            Торговаться с жителями
                            <Punishment text="Возврат купленных ресурсов" stars={20}/>
                        </li>
                        <li>
                            Если владелец просит, то необходимо покинуть территорию
                            <Punishment stars={10}/>
                        </li>
                    </ul>
                </Rule>
                <Rule number={4.3}>
                    <p>
                        Если вы хотите как-то дополнить эти правила, то напишите их в {" "}
                        <TextUrl
                            href="https://discord.gg/xGv8srKKsz"
                        >
                            Территории
                        </TextUrl>
                    </p>
                    <p>
                        При этом наказания за нарушения ваших правил, должны быть равноценны содеянному
                    </p>
                    <br/>
                    <p>
                        Чтобы запретить вход на вашу территорию, она должна:
                    </p>
                    <ol>
                        <li>
                            Иметь таблички с информацией на всех главных входах и порталах на базу
                        </li>
                        <li>
                            Договориться с мэром мира
                        </li>
                    </ol>
                    <br/>
                    <p>
                        Запрещая вход на территорию означает, что человек попадающий на неё, должен уйти с неё в
                        течение 5 минут, чтобы была возможность пройти через чужие базы
                    </p>
                </Rule>
                <Rule number={4.4} text="Откуп алмазами">
                    <p>
                        При занимании места ближе, чем на 60 блоков к чужой базе или на 150 блоков к нулевым
                        координатам, надо спрашивать их владельцев или мэра мира
                    </p>
                </Rule>
                <Rule number={4.5} stars={50}>
                    <p>Общими территориями являются <small>(их нельзя занимать)</small>:</p>
                    <ul>
                        <li>
                            Места лора
                        </li>
                        <li>
                            Cпавн во всех измерениях и все виды порталов к ним. Стиль спавна выбирается в телеграм
                            канале
                        </li>
                        <li>
                            Любые большие данжи
                        </li>
                    </ul>
                </Rule>
                <Rule number={4.6} stars={50}>
                    <p>
                        Нельзя запрещать проход к данжам или убийства мобов / боссов в нём{" "}
                        <small>(кроме фармилок мобов)</small>
                    </p>
                </Rule>
                <Rule number={4.7}>
                    <p>
                        Максимальная расстояние всех территорий на одного игрока - 250 блоков на 250 блоков{" "}
                        <small>(Площадь - 62.500 блоков)</small>
                    </p>
                    <p>
                        Игроки могут объединяться, чтобы захватывать территории побольше
                    </p>
                    <p>
                        В случае привата огромной территории, по мнению модеров, ваша территория может
                        быть отдана в чужие руки
                    </p>
                </Rule>
                <Rule number={4.8} stars={30}>
                    <p>
                        Запрещено строительство некрасивых никчёмных построек, не имеющих никакого значения:
                        рандомные столбы и лестницы в небо и т.д.
                    </p>
                    <p>
                        Их нужно сносить сразу, иначе их владелец может получить понижение звёзд
                    </p>
                </Rule>
            </RulesBox>

            <RulesBox name="cheats" heading="Запрещённые преимущества" number={5}>
                <Rule number={5.1} stars={200}>
                    <p>
                        Можно использовать модификации и форки:
                    </p>
                    <ul>
                        <li>
                            перечисленные в{" "}
                            <Link href="/rules/mods" className="unic_color medium-font">разрешённом списке</Link>
                        </li>
                        <li>
                            участвующие в официальных сборках от сервера
                        </li>
                    </ul>
                    <p>
                        Иные модификации использовать на сервере нельзя
                    </p>
                </Rule>
                <Rule number={5.2} text="Бан">
                    <p>
                        Хелперы в праве вызвать вас на проверку читов.
                        Отказ от проверки или игнорирование в течение 5-15 минут = бан.
                        Вы можете подать апелляцию, если считаете бан незаслуженным
                    </p>
                </Rule>
                <Rule number={5.2} stars={200}>
                    <p>
                        Дюпы запрещены, но разрешены следующие:
                    </p>
                    <ul>
                        <li>
                            ковров
                        </li>
                        <li>
                            <Link
                                href="https://ru.minecraft.wiki/w/Руководство:Самодвижущиеся_аппараты_на_блоках_слизи"
                                className="unic_color medium-font"
                                target="_blank"
                            >
                                ТНТ
                            </Link> (до 10 на команду / человека)
                        </li>
                    </ul>
                </Rule>
                <Rule number={5.3} stars={200}>
                    Лаг машины запрещены
                </Rule>
                <Rule number={5.4} stars={300}>
                    Любые попытки обхода блокировок категорически запрещены и будут приводить к продлению и
                    изменению их типа на более строгий
                </Rule>
            </RulesBox>

            <RulesBox name="trading" heading="Торговля" number={6}>
                <Rule number={6.1}>
                    Валюта сервера в городах и торговых зонах алмазы, за их пределами разрешён бартер
                </Rule>
                <Rule number={6.2} stars={400}>
                    Продажа ресурсов за реальные деньги запрещена.
                </Rule>
                <Rule number={6.3} stars={70}>
                    Запрещено намеренное создание дефицита и искусственное завышение цен на любые ресурсы.
                    Не пытайтесь {'"'}сломать{'"'} экономику сервера
                </Rule>
            </RulesBox>

            <RulesBox name="unknown_url" heading="Сторонние ресурсы" number={7}>
                <Rule number={7.1} stars={150}>
                    Ссылки на сторонние Discord-сервера запрещены
                </Rule>
                <Rule number={7.2} stars={200}>
                    Ссылки на сайты / соцсети майнкрафт серверов-конкурентов запрещены
                </Rule>
                <Rule number={7.3} stars={300}>
                    <p>
                        Реклама, не связанная с нашим проектом, без согласия админов запрещена. {" "}
                        <TextUrl href="https://t.me/JustCheburek">
                            Купить согласие
                        </TextUrl>
                    </p>
                    <br/>
                    <p>
                        Рекламой считаются выражения:
                    </p>
                    <ul>
                        <li>
                            В голосовых чатах: прямые и очевидные высказывания
                        </li>
                        <li>
                            В текстовых чатах: наполовину прямые и наполовину очевидные
                            высказывания
                        </li>
                    </ul>
                </Rule>
            </RulesBox>

            <RulesBox name="lor" heading="Лор" number={8}>
                <Rule number={8.1} stars={30}>
                    <p>
                        Лор — общее достояние и одна из уникальностей сервера
                    </p>
                    <p>
                        Вы можете строить свои гипотезы по поводу лора
                    </p>
                    <br/>
                    <p>
                        Любые предметы и места лора <span className="red_color medium-font">нельзя</span> {" "}
                        продавать или приватизировать
                    </p>
                    <br/>
                    <p>
                        Как определить места лора:
                    </p>
                    <ul>
                        <li>
                            Имеет книги или записки на русском языке
                        </li>
                        <li>
                            Хорошо вписано в окружение
                        </li>
                        <li>
                            Выделяется по сравнению с другими постройками своими размерами
                        </li>
                        <li>
                            Находится в привате
                        </li>
                    </ul>
                </Rule>
            </RulesBox>

            <RulesBox name="court" heading="Суд" number={9}>
                <Rule number={9.1}>
                    <p>
                        На нём разбираются только самые тягостные нарушения
                    </p>
                    <p>
                        Удобное время суда обговаривается для всех участвующих лиц суда
                    </p>
                </Rule>
                <Rule number={9.2} text="-рейт каждый день">
                    <p>
                        Невозможность собрания суда по причине отсутствия обвиняемого
                    </p>
                </Rule>
                <Rule number={9.3}>
                    <p>
                        Откуп назначенный в суде обязателен к выплате
                    </p>
                    <p>
                        Время выплаты по умолчанию - 1 неделя
                    </p>
                    <p>
                        Не выплата - бан
                    </p>
                </Rule>
            </RulesBox>

            <p className="red_line">
                Заметили нарушение правил? {" "}
                <TextUrl href="https://discord.gg/VtXNje8xHq">
                    Напишите репорт!
                </TextUrl>
            </p>
            <p className="red_line">
                Админы не обязаны уведомлять игроков об небольшом изменении правил. Игрок сам должен
                следить за изменениями в {" "}
                <TextUrl href="https://t.me/MineBridgeOfficial">
                    Новостях проекта
                </TextUrl>
            </p>
        </div>

        <OnThisPage>
            <OnThisPageLink href="#general">
                <Number>1</Number>
                Общие
            </OnThisPageLink>
            <OnThisPageLink href="#communication">
                <Number>2</Number>
                Общение
            </OnThisPageLink>
            <OnThisPageLink href="#game_interferences">
                <Number>3</Number>
                Игра
            </OnThisPageLink>
            <OnThisPageLink href="#areas">
                <Number>4</Number>
                Территории
            </OnThisPageLink>
            <OnThisPageLink href="#cheats">
                <Number>5</Number>
                Читы
            </OnThisPageLink>
            <OnThisPageLink href="#trading">
                <Number>6</Number>
                Торговля
            </OnThisPageLink>
            <OnThisPageLink href="#unknown_url">
                <Number>7</Number>
                Реклама
            </OnThisPageLink>
            <OnThisPageLink href="#lor">
                <Number>8</Number>
                Лор
            </OnThisPageLink>
            <OnThisPageLink href="#court">
                <Number>9</Number>
                Суд
            </OnThisPageLink>
        </OnThisPage>
    </>)
}