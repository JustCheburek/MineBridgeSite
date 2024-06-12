// React
import type {Metadata} from "next";
import Link from "next/link";
import TimeAgo from "javascript-time-ago";

// Стили
import styles from './rules.module.scss';

// Компоненты
import {Punishment, Rule, RulesBox} from "./components";
import {OnThisPage, OnThisPageHeading, OnThisPageLink} from "@components/sideNav";
import {TextUrl} from "@components/textUrl";
import {UserBox} from "@components/userBox";

export const metadata: Metadata = {
	title: "Правила | Майнбридж",
	description: "Социальный рейтинг — внутриигровая награда или наказание. Суды, баны, муты, всё это про нас!",
};

const timeAgo = new TimeAgo('ru-RU');

export default function Rules() {
	const lastUpdate = new Date(2024, 6 - 1, 12);

	return (
			<>
				<div className="rules_content">
					<h1>
						Правила
					</h1>
					<p>
						Последнее изменение правил: {" "}
						<time dateTime={lastUpdate.toISOString()}>
							<strong className="unic_color">
								{timeAgo.format(lastUpdate)}
							</strong>
							{" "}
							<small>({lastUpdate.toLocaleDateString()})</small>
						</time>
					</p>
					<p>
						На сервере действует особый <strong className="unic_color">социальный рейтинг</strong>:
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
						<h2 className="unic_color center_text">
							Кратко
						</h2>
						<div>
							<h3 className="red_color">
								НEЛЬЗЯ:
							</h3>
							<strong>При общении</strong>
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
							<br/>
							<strong>При игре</strong>
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
					<p>
						Снижаемый рейтинг является приблизительным, всё
						зависит от тяжести содеянного
					</p>
					<RulesBox name="general" heading="Общение" number={1}>
						<Rule number={1.1} punishment={50}>
							Любые формы оскорблений запрещены
						</Rule>
						<Rule number={1.2} punishment={15}>
							Для определённых сообщений существуют свои каналы {" "}
							<small>(репорты в #репорты, баги в #тех-поддержка)</small>
						</Rule>
						<Rule number={1.3} punishment={15}>
							Спам и флуд запрещены
						</Rule>
						<Rule number={1.4} punishment="Бан">
							Контент NSFW (18+ и т. п.) запрещен
						</Rule>
						<Rule number={1.5} punishment={20}>
							Запрещено нарушение правил {" "}
							<TextUrl href="https://twitch.tv/creatorcamp/ru-ru/paths/rules-policies-and-guidelines/">
								платформы Twitch
							</TextUrl><br/>
							<Link href="/rules/blacklist" className="unic_color">Список банвордов</Link>
						</Rule>
						<Rule number={1.6} punishment={20}>
							Мат не приветствуется, череда матов - наказание
						</Rule>
					</RulesBox>

					<RulesBox name="game_interferences" heading="Игровые помехи" number={2}>
						<Rule number={2.1} punishment={30}>
							<p>
								Запрещена ходьба перед игроком, ломание блоков под или перед ним, стрельба
								любым видом снарядов в игрока
							</p>
						</Rule>
						<Rule number={2.2} punishment="Суд">
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
									Или иметь согласие модеров или админов
								</li>
							</ul>
						</Rule>
						<Rule number={2.3} punishment="Суд">
							<p>Убийства должны:</p>
							<ul>
								<li>
									Иметь согласие у двух сторон
								</li>
								<li>
									Или иметь согласие администрации
								</li>
								<li>
									Удостоверьтесь, что пвп арена имеет письменный договор от одного из админов
									или модеров, иначе вы можете понизить свой рейтинг за участие в неофициальной
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
									<Punishment punishment="Возврат ресурсов + 5 алмазов"/>
								</li>
								<li>
									Строить, ломать и изменять блоки. За собой необходимо чинить взрывы от криперов
									<Punishment punishment="Починка или штраф от 8 алмазов"/>
								</li>
								<li>
									Убивать мирных и нейтральных существ.
									А также враждебных существ, у которых есть признаки, что этот моб нужен{" "}
									<small>
										(используются в фермах, механизмах; окружены блоками)
									</small>
									<Punishment punishment="От владельца"/>
								</li>
								<li>
									Торговаться с жителями
									<Punishment punishment="Возврат купленных ресурсов"/>
								</li>
								<li>
									Если владелец просит, то необходимо покинуть территорию
									<Punishment punishment={20}/>
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
									Быть дальше, чем 300 блоков от нулевых координат
								</li>
							</ol>
							<br/>
							<p>
								Запрещая вход на территорию означает, что человек попадающий на неё, должен уйти с неё в
								течение 5 минут, чтобы была возможность пройти через чужие базы
							</p>
						</Rule>
						<Rule number={3.4} punishment="Откуп алмазами">
							<p>
								При занимании места ближе, чем на 50 блоков к чужой базе или на 150 блоков к нулевым координатам, надо
								спрашивать их владельцев или мэра спавна
							</p>
						</Rule>
						<Rule number={3.5} punishment={50}>
							<p>Общими территориями являются <small>(их нельзя занимать)</small>:</p>
							<ul>
								<li>
									Места лора
								</li>
								<li>
									Cпавн верхнего мира. Любой может строить магазины и другие украшения в пределах
									разумного. Стиль спавна указан на табличке на спавне
								</li>
								<li>
									Спавн ада
								</li>
								<li>
									Главный остров в энде и все его порталы
								</li>
								<li>
									Спавнера блейзов в адских крепостях
								</li>
							</ul>
						</Rule>
						<Rule number={3.6}>
							<p>
								Максимальная расстояние территории на одного игрока - 250 блоков на 250 блоков{" "}
								<small>(Площадь - 62.500 блоков)</small>
							</p>
							<p>
								Игроки могут объединяться, чтобы захватывать территории побольше
							</p>
							<p>
								В случае привата огромной территории, по мнению админов или модеров, ваша территория может быть отдана
								в чужие руки
							</p>
						</Rule>
						<Rule number={3.7} punishment={30}>
							<p>
								Запрещено строительство некрасивых никчёмных постройки, не имеющих никакого значения:
								рандомные столбы и лестницы в небо и т.д.
							</p>
							<p>
								Их нужно сносить сразу, иначе их владелец может понизить себе рейтинг
							</p>
						</Rule>
					</RulesBox>

					<RulesBox name="cheats" heading="Запрещённые преимущества" number={4}>
						<Rule number={4.1} punishment={200}>
							<p>
								Читы запрещены в любом виде: {" "}
								<Link href="/rules/mods" className="unic_color medium-font">список модификаций</Link>
							</p>
							<p>
								Админы и модеры в праве вызвать вас на проверку читов.
								Уход с проверки:
							</p>
							<ul>
								<li>
									В первый раз — бан на 3 дня
								</li>
								<li>
									Во второй раз — -200 рейтинга
								</li>
							</ul>
						</Rule>
						<Rule number={4.2} punishment={200}>
							<p>
								Дюпы запрещены, но разрешены следующие:
							</p>
							<ul>
								<li>
									ковров
								</li>
								<li>
									тнт (гуси)
								</li>
								<li>
									сыпучих блоков
								</li>
							</ul>
						</Rule>
						<Rule number={4.3} punishment={200}>
							Лаг машины запрещены
						</Rule>
						<Rule number={4.4} punishment={300}>
							Любые попытки обхода блокировок категорически запрещены и будут приводить к продлению и
							изменению их типа на более строгий
						</Rule>
					</RulesBox>

					<RulesBox name="trading" heading="Торговля" number={5}>
						<Rule number={5.1} punishment={30}>
							Валюта сервера в городах и торговых зонах алмазы, за их пределами разрешён бартер
						</Rule>
						<Rule number={5.2} punishment={300}>
							Продажа ресурсов за реальные деньги запрещена
						</Rule>
						<Rule number={5.3} punishment={70}>
							Запрещено намеренное создание дефицита и искусственное завышение цен на любые ресурсы.
							Не пытайтесь {'"'}сломать{'"'} экономику сервера
						</Rule>
					</RulesBox>

					<RulesBox name="unknown_url" heading="Сторонние ресурсы" number={6}>
						<Rule number={6.1} punishment={50}>
							Ссылки на сторонние Discord-сервера запрещены
						</Rule>
						<Rule number={6.2} punishment={100}>
							Ссылки на сайты / соцсети майнкрафт серверов-конкурентов запрещены
						</Rule>
						<Rule number={6.3} punishment={20}>
							<p>
								Реклама, не связанная с нашим проектом, без согласия администрации запрещена. {" "}
								<TextUrl
										href="https://t.me/JustCheburek"
								>
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
						<Rule number={7.1} punishment={30}>
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
						<Rule number={8.2} punishment="-рейт каждый день">
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

					<RulesBox name="roles" heading="Роли" number={9}>
						<Rule number={9.1}>
							На сервере действуют следующие роли, они расположены в иерархии:
						</Rule>
						<Rule number={9.2}>
							<p>
								Админ — главная часть сервера
							</p>
							<p>
								Разработка сайта, ведение соцсетей и самого сервера осуществляются именно ими
							</p>
							<UserBox _id="j8bsrsdgzqa4n0c"/>
							<UserBox _id="i5mqq2js4nos1yj"/>
						</Rule>
						<Rule number={9.3}>
							<p>
								Модер — помощники админов
							</p>
							<p>
								Модерации запрещено абьюзить свои права
							</p>
							<UserBox _id="djfp8h9j2ffbdzz"/>
							<UserBox _id="svp3okvcuo6062d"/>
							<UserBox _id="biu4vqvuev0m0tp"/>
							<TextUrl href="https://discord.gg/swrAFFqvH2">
								Стать модером
							</TextUrl>
						</Rule>
						<Rule number={9.4}>
							<p>
								Админы и модеры имеют бóльшие права, чем правила, итоговое решение остаётся за ними
							</p>
						</Rule>
						<Rule number={9.5}>
							<p>
								Мэр спавна — избирается админами или игроками в нашем телеграме на один сезон
							</p>
							<p>
								В течение и в конце сезона за ухоженный и красивый спавн получает мостики и социальный рейтинг
							</p>
							<p>
								Мэр имеет право запретить строительство на спавне / снести постройку без разрешения владельца
							</p>
							<TextUrl href="https://discord.gg/AkZHn9q5KV">
								Стать мэром
							</TextUrl>
						</Rule>
						<Rule number={9.6}>
							<p>
								Художник — рисует <Link href="/features/stickers" className="unic_color medium-font">стикеры</Link>
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
								Можно получать от 5 соц рейтинга за каждый продуктивный тест
							</p>
						</Rule>
						<Rule number={9.8}>
							<p>
								Контент мейкер — стример / ютубер по MineBridge
							</p>
							<br/>
							<p>
								Получает специальный промокод:
							</p>
							<ul>
								<li>
									Покупатель: использует при покупке мостиков и получает бесплатный кейс {" "}
									<small>(редкость и дроп зависит от суммы покупки)</small>
								</li>
								<li>
									Контент мейкер: получает бонус 10% мостиков от суммы покупки
								</li>
							</ul>
							<UserBox _id="i5mqq2js4nos1yj"/>
							<UserBox _id="j8bsrsdgzqa4n0c"/>
							<UserBox _id="cds85p9u89qfyn1"/>
							<UserBox _id="t2dhhl5igw1sp43"/>
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
					<OnThisPageHeading>
						Содержание
					</OnThisPageHeading>
					<OnThisPageLink href="#general">
						<span className={styles.number_box}>1</span>
						Общение
					</OnThisPageLink>
					<OnThisPageLink href="#game_interferences">
						<span className={styles.number_box}>2</span>
						Игра
					</OnThisPageLink>
					<OnThisPageLink href="#areas">
						<span className={styles.number_box}>3</span>
						Территории
					</OnThisPageLink>
					<OnThisPageLink href="#cheats">
						<span className={styles.number_box}>4</span>
						Читы
					</OnThisPageLink>
					<OnThisPageLink href="#trading">
						<span className={styles.number_box}>5</span>
						Торговля
					</OnThisPageLink>
					<OnThisPageLink href="#unknown_url">
						<span className={styles.number_box}>6</span>
						Реклама
					</OnThisPageLink>
					<OnThisPageLink href="#lor">
						<span className={styles.number_box}>7</span>
						Лор
					</OnThisPageLink>
					<OnThisPageLink href="#court">
						<span className={styles.number_box}>8</span>
						Суд
					</OnThisPageLink>
					<OnThisPageLink href="#roles">
						<span className={styles.number_box}>9</span>
						Роли
					</OnThisPageLink>
				</OnThisPage>
			</>
	)
}