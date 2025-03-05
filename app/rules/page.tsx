// React
import type {Metadata} from "next";
import Link from "next/link";
import TimeAgo from "javascript-time-ago";
import ru from "javascript-time-ago/locale/ru";

// Стили
import styles from './rules.module.scss';

// Компоненты
import {Punishment, Rule, RulesBox} from "@components/rules";
import {OnThisPage, OnThisPageLink} from "@components/sideNav";
import {TextUrl} from "@components/textUrl";
import {UserBox} from "@components/userBox";
import {LASTRULESUPDATE} from "@/const";
import {H1} from "@components/h1";
import {Number} from "@components/number";

export const metadata: Metadata = {
    title: "Правила",
    description: "Звёзды — внутриигровая награда или наказание. Суды, баны, муты, всё это про нас!"
};

TimeAgo.addLocale(ru);
const timeAgo = new TimeAgo('ru-RU');

export default function Rules() {
    return (
        <>
            <div className="rules_content">
                <H1 up>Правила</H1>
                <p>
                    Последнее изменение правил: {" "}
                    <time dateTime={LASTRULESUPDATE.toISOString()}>
                        <strong className="unic_color">
                            {timeAgo.format(LASTRULESUPDATE)}
                        </strong>{" "}
                        <small>
                            ({LASTRULESUPDATE.toLocaleDateString("ru-RU", {dateStyle: "long"})})
                        </small>
                    </time>
                </p>
                <p>
                    На сервере действует особый <strong className="unic_color">звёздный рейтинг</strong>:
                </p>
                <ul id="social" className="remove_marker">
                    <li>
                        <span className="green_color medium-font">+200 и больше</span> — особый значок в чате
                    </li>
                    <li>
                        <span className="red_color medium-font">-100 и меньше</span> — мут
                    </li>
                    <li>
                        <span className="red_color medium-font">-200 и меньше</span> — бан в майне
                    </li>
                    <li>
                        <span className="red_color medium-font">-300 и меньше</span> — бан в дс
                    </li>
                </ul>
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
                                    Говорить <Link href="/rules/blacklist" className="unic_color">бан-ворды</Link>
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
                <p>
                    Снижаемые звёзды являются приблизительным, всё
                    зависит от тяжести содеянного
                </p>
                <RulesBox name="general" heading="Общение" number={1}>
                    <Rule number={1.1} stars={50}>
                        Любые формы оскорблений запрещены
                    </Rule>
                    <Rule number={1.2} stars={15}>
                        Для определённых сообщений существуют свои каналы<br/>
                        <small>(репорты в #репорты, баги в #тех-поддержка)</small>
                    </Rule>
                    <Rule number={1.3} stars={15}>
                        Спам и флуд запрещены
                    </Rule>
                    <Rule number={1.4} text="Бан">
                        Контент NSFW (18+ и т. п.) запрещен
                    </Rule>
                    <Rule number={1.5} stars={35}>
                        Запрещено нарушение правил {" "}
                        <TextUrl href="https://twitch.tv/creatorcamp/ru-ru/paths/rules-policies-and-guidelines/">
                            платформы Twitch
                        </TextUrl><br/>
                        <Link href="/rules/blacklist" className="unic_color">Список банвордов</Link>
                    </Rule>
                    <Rule number={1.6} stars={20}>
                        Мат не приветствуется, череда матов = наказание
                    </Rule>
                    <Rule number={1.7} text="Бан">
                        Запрещён деанон, доксинг, манипуляция, слив личных данных без разрешения
                    </Rule>
                </RulesBox>

                <RulesBox name="game_interferences" heading="Игровые помехи" number={2}>
                    <Rule number={2.1} stars={30}>
                        <p>
                            Запрещена ходьба перед игроком, ломание блоков под или перед ним, стрельба
                            любым видом снарядов в игрока
                        </p>
                    </Rule>
                    <Rule number={2.2} text="Суд">
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
                                Или иметь согласие помогаторов, модеров или админов
                            </li>
                        </ul>
                    </Rule>
                    <Rule number={2.3} text="Суд">
                        <p>Убийства должны:</p>
                        <ul>
                            <li>
                                Иметь согласие у двух сторон
                            </li>
                            <li>
                                Или иметь согласие администрации
                            </li>
                            <li>
                                Удостоверьтесь, что пвп арена имеет письменный договор от одного из админов,
                                модеров или судий, иначе вы можете понизить свои звёзды за участие в неофициальной
                                пвп арене. {" "}
                                <TextUrl
                                    href="https://discord.gg/f95V9Rezqy"
                                >
                                    Получить согласие
                                </TextUrl>
                            </li>
                        </ul>
                    </Rule>
                </RulesBox>

                <RulesBox name="areas" heading="Территории" number={3}>
                    <Rule number={3.1}>
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
                    <Rule number={3.2}>
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
                    <Rule number={3.3}>
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
                    <Rule number={3.4} text="Откуп алмазами">
                        <p>
                            При занимании места ближе, чем на 60 блоков к чужой базе или на 150 блоков к нулевым
                            координатам, надо спрашивать их владельцев или мэра мира
                        </p>
                    </Rule>
                    <Rule number={3.5} stars={50}>
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
                    <Rule number={3.6} stars={50}>
                        <p>
                            Нельзя запрещать проход к данжам или убийства мобов / боссов в нём{" "}
                            <small>(кроме фармилок мобов)</small>
                        </p>
                    </Rule>
                    <Rule number={3.7}>
                        <p>
                            Максимальная расстояние всех территорий на одного игрока - 250 блоков на 250 блоков{" "}
                            <small>(Площадь - 62.500 блоков)</small>
                        </p>
                        <p>
                            Игроки могут объединяться, чтобы захватывать территории побольше
                        </p>
                        <p>
                            В случае привата огромной территории, по мнению админов или модеров, ваша территория может
                            быть отдана в чужие руки
                        </p>
                    </Rule>
                    <Rule number={3.8} stars={30}>
                        <p>
                            Запрещено строительство некрасивых никчёмных построек, не имеющих никакого значения:
                            рандомные столбы и лестницы в небо и т.д.
                        </p>
                        <p>
                            Их нужно сносить сразу, иначе их владелец может получить понижение звёзд
                        </p>
                    </Rule>
                </RulesBox>

                <RulesBox name="cheats" heading="Запрещённые преимущества" number={4}>
                    <Rule number={4.1} stars={200}>
                        <p>
                            Читы запрещены в любом виде: {" "}
                            <Link href="/rules/mods" className="unic_color medium-font">список модификаций</Link>
                        </p>
                        <p>
                            Админы, модеры и хелперы в праве вызвать вас на проверку читов.
                            Уход с проверки:
                        </p>
                        <ul>
                            <li>
                                В первый раз — бан на 3 дня
                            </li>
                            <li>
                                Во второй раз — -200 звёзд
                            </li>
                        </ul>
                    </Rule>
                    <Rule number={4.2} stars={200}>
                        <p>
                            Дюпы запрещены, но разрешены следующие:
                        </p>
                        <ul>
                            <li>
                                ковров
                            </li>
                            <li>
                                тнт (гуси) (до 10 на команду / человека)
                            </li>
                            <li>
                                сыпучих блоков
                            </li>
                        </ul>
                    </Rule>
                    <Rule number={4.3} stars={200}>
                        Лаг машины запрещены
                    </Rule>
                    <Rule number={4.4} stars={300}>
                        Любые попытки обхода блокировок категорически запрещены и будут приводить к продлению и
                        изменению их типа на более строгий
                    </Rule>
                </RulesBox>

                <RulesBox name="trading" heading="Торговля" number={5}>
                    <Rule number={5.1}>
                        Валюта сервера в городах и торговых зонах алмазы, за их пределами разрешён бартер
                    </Rule>
                    <Rule number={5.2} stars={400}>
                        Продажа ресурсов за реальные деньги запрещена. Продажа вещей за мостики осуществляется только
                        при администрации
                    </Rule>
                    <Rule number={5.3} stars={70}>
                        Запрещено намеренное создание дефицита и искусственное завышение цен на любые ресурсы.
                        Не пытайтесь {'"'}сломать{'"'} экономику сервера
                    </Rule>
                </RulesBox>

                <RulesBox name="unknown_url" heading="Сторонние ресурсы" number={6}>
                    <Rule number={6.1} stars={150}>
                        Ссылки на сторонние Discord-сервера запрещены
                    </Rule>
                    <Rule number={6.2} stars={200}>
                        Ссылки на сайты / соцсети майнкрафт серверов-конкурентов запрещены
                    </Rule>
                    <Rule number={6.3} stars={300}>
                        <p>
                            Реклама, не связанная с нашим проектом, без согласия администрации запрещена. {" "}
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

                <RulesBox name="lor" heading="Лор" number={7}>
                    <Rule number={7.1} stars={30}>
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
                                Близко к спавну
                            </li>
                            <li>
                                Находится в привате
                            </li>
                        </ul>
                    </Rule>
                </RulesBox>

                <RulesBox name="court" heading="Суд" number={8}>
                    <Rule number={8.1}>
                        <p>
                            На нём разбираются только самые тягостные нарушения
                        </p>
                        <p>
                            Удобное время суда обговаривается для всех участвующих лиц суда
                        </p>
                    </Rule>
                    <Rule number={8.2} text="-рейт каждый день">
                        <p>
                            Невозможность собрания суда по причине отсутствия обвиняемого
                        </p>
                    </Rule>
                    <Rule number={8.3}>
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

                <RulesBox name="roles" heading="Иерархия ролей" number={9}>
                    <Rule number={9.1}>
                        <p>
                            Вышестоящая роль управляет нижестоящей
                        </p>
                        <p>
                            При отсутствии необходимых знаний нижестоящая роль может обратиться к вышестоящей
                        </p>
                        <p>
                            Админы и модеры имеют бóльшие права, чем правила, итоговое решение остаётся за ними
                        </p>
                        <br/>
                        <p>
                            Запрещён абъюз своих прав
                        </p>
                        <p>
                            Запрещено раскрывать информацию, не доступную для обычных игроков
                        </p>
                    </Rule>
                    <Rule number={9.2}>
                        <p>
                            Админ — самая высшая роль <small>(= создатель)</small>
                        </p>
                        <ul>
                            <li>
                                Разработка сайта
                            </li>
                            <li>
                                Управление майнкрафт сервером и хостингом
                            </li>
                            <li>
                                Ведение соцсетей и мониторинг серверов
                            </li>
                            <li>
                                Исправление багов
                            </li>
                            <li>
                                Креативные идеи
                            </li>
                            <li>
                                Дизайнерство
                            </li>
                            <li>
                                Билдерство
                            </li>
                            <li>
                                Планы сервера
                            </li>
                            <li>
                                Набор игроков на роли
                            </li>
                        </ul>
                        <UserBox _id="j8bsrsdgzqa4n0c"/>
                        <UserBox _id="i5mqq2js4nos1yj"/>
                        <UserBox _id="8v4pdxujk92dgh5"/>
                    </Rule>
                    <Rule number={9.3}>
                        <p>
                            Модер
                        </p>
                        <ul>
                            <li>
                                Настройка и перевод плагинов, датапаков, ресурс паков и тому подобное
                            </li>
                            <li>
                                Билдерство
                            </li>
                            <li>
                                Тестирование
                            </li>
                            <li>
                                Решения важных ситуаций
                            </li>
                        </ul>
                    </Rule>
                    <Rule number={9.4}>
                        <p>
                            Помогатор - категория, делится на 3 подкатегории:
                        </p>
                        <br/>
                        <h4>
                            Хелпер
                        </h4>
                        <ul>
                            <li>
                                Помощь игрокам с их вопросами и вайтлистом
                            </li>
                            <li>
                                Осведомление админов о багах сервера
                            </li>
                            <li>
                                Тестирование
                            </li>
                            <li>
                                Откат ресурсов игроков в чрезвычайных ситуациях
                            </li>
                        </ul>
                        <UserBox _id="ruef6d47y245c0x"/>
                        <br/>
                        <h4>
                            Судья
                        </h4>
                        <ul>
                            <li>
                                Помощь игрокам для определения общего решения конфликта
                            </li>
                            <li>
                                Управление звёздами{" "}
                                <small>(выдача звёзд за общественные дела и понижение звёзд за
                                    проступки)</small>
                            </li>
                        </ul>
                        <UserBox _id="t2dhhl5igw1sp43"/>
                        <UserBox _id="cd8u5lqjg9zjr1b"/>
                        <br/>
                        <h4>
                            Акционер
                        </h4>
                        <ul>
                            <li>
                                Не имеет прав помогаторов
                            </li>
                            <li>
                                Участие в различных голосованиях в чате помогаторов
                            </li>
                            <li>
                                Представляет общественное мнение
                            </li>
                            <li>
                                Покупается за 500₽ в месяц
                            </li>
                        </ul>
                        <UserBox _id="biu4vqvuev0m0tp"/>
                        <br/>
                        <TextUrl href="https://discord.gg/swrAFFqvH2">
                            Стать помогатором
                        </TextUrl>
                    </Rule>
                    <Rule number={9.5}>
                        <p>
                            Мэр мира — избирается игроками на один сезон
                        </p>
                        <p>
                            В течение и в конце сезона за ухоженный и красивый спавн получает звёзды
                        </p>
                        <p>
                            Мэр имеет право запретить строительство на спавне / снести постройку без разрешения
                            владельца
                        </p>
                        <TextUrl href="https://discord.gg/AkZHn9q5KV">
                            Стать мэром
                        </TextUrl>
                    </Rule>
                    <Rule number={9.6}>
                        <p>
                            Художник — рисует{" "}
                            <Link href="/features/stickers" className="unic_color medium-font">
                                стикеры
                            </Link>
                        </p>
                        <TextUrl href="https://t.me/MineBridgeOfficial/326">
                            Заказать
                        </TextUrl>
                    </Rule>
                    <Rule number={9.7}>
                        <p>
                            Тестировщик — проверяет новые фичи сервера и сайта
                        </p>
                        <p>
                            Может получать от 5 звёзд за каждый продуктивный тест
                        </p>
                    </Rule>
                    <Rule number={9.8}>
                        <p>
                            Контент мейкер — стример / ютубер по MineBridge
                        </p>
                    </Rule>
                </RulesBox>

                <p className="red_line">
                    Незнание правил и их обновлений не освобождает от ответственности наказаний
                </p>
                <p className="red_line">
                    Правила действуют не зависимо от стримов, видео, ролей, кланов и других факторов
                </p>
                <p className="red_line">
                    Ответственность всегда несет владелец аккаунта, а также игрок, который совершил эти
                    действия {" "}
                    <small>
                        [Исключение: Взлом аккаунта, владельцу нужно только возместить ущерб]
                    </small>
                </p>
                <p className="red_line">
                    Заметили нарушение правил? {" "}
                    <TextUrl href="https://discord.gg/VtXNje8xHq">
                        Напишите репорт!
                    </TextUrl>
                </p>
                <p className="red_line">
                    Администрация не обязана уведомлять игроков об небольшом изменении правил. Игрок сам должен
                    следить за изменениями в {" "}
                    <TextUrl href="https://t.me/MineBridgeOfficial">
                        Новостях проекта
                    </TextUrl>
                </p>
            </div>

            <OnThisPage>
                <OnThisPageLink href="#general">
                    <Number>1</Number>
                    Общение
                </OnThisPageLink>
                <OnThisPageLink href="#game_interferences">
                    <Number>2</Number>
                    Игра
                </OnThisPageLink>
                <OnThisPageLink href="#areas">
                    <Number>3</Number>
                    Территории
                </OnThisPageLink>
                <OnThisPageLink href="#cheats">
                    <Number>4</Number>
                    Читы
                </OnThisPageLink>
                <OnThisPageLink href="#trading">
                    <Number>5</Number>
                    Торговля
                </OnThisPageLink>
                <OnThisPageLink href="#unknown_url">
                    <Number>6</Number>
                    Реклама
                </OnThisPageLink>
                <OnThisPageLink href="#lor">
                    <Number>7</Number>
                    Лор
                </OnThisPageLink>
                <OnThisPageLink href="#court">
                    <Number>8</Number>
                    Суд
                </OnThisPageLink>
                <OnThisPageLink href="#roles">
                    <Number>9</Number>
                    Роли
                </OnThisPageLink>
            </OnThisPage>
        </>
    )
}