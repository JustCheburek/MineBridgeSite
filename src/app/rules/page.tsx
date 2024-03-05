// React
import type {Metadata} from "next";
import Link from "next/link";
// import {useTimeAgo} from "next-timeago";
// Стили
import styles from './rules.module.scss';

// Компоненты
import {SubsectionItem, Subsections} from '@components/subsections'
import {Punishment, Rule, RulesBox} from "./components";
import {OnThisPage, OnThisPageItem} from "@components/onThisPage";
import {MaxSize} from "@components/maxSize";

export const metadata: Metadata = {
	title: "Правила | Майнбридж",
	description: "Социальный рейтинг — внутриигровая награда или наказание. Суды, баны, муты, всё это про нас!",
};

export default function Rules() {
	const lastUpdate = new Date(2024, 2 - 1, 15);

	return (
			<main>
				<MaxSize sideNav>
					<Subsections menu="Меню правил">
						<SubsectionItem href="/rules">
							Правила
						</SubsectionItem>
						<SubsectionItem href="/rules/mods">
							Моды
						</SubsectionItem>
						<SubsectionItem href="/rules/blacklist">
							Выражения
						</SubsectionItem>
					</Subsections>

					<div className="rules_content">
						<h1>
							Правила
						</h1>
						<p>
							Последнее изменение правил: {" "}
							<time dateTime={lastUpdate.toISOString()}>
								<strong className="unic_color">
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
								<span className="red_color medium-font">-200 и меньше</span> — бан навсегда в майне
							</li>
							<li>
								<span className="red_color medium-font">-300 и меньше</span> — бан навсегда в дс
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
										Матерится (часто)
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
						<p><span className="red_color medium-font">-20 рейтинга</span> каждый день, если Вы:</p>
						<ul>
							<li>
								Пропустили в суд <small>(время договорное)</small>
							</li>
							<li>
								Не начали выполнять просьбу в течение 4-7 дней, в зависимости от сложности просьбы{" "}
								<small>
									(починить за собой что-либо, снести свои мешающие блоки и т.д.)
								</small>
							</li>
							<li>
								Не возвращаете откуп в течение срока, назначенного в суде
							</li>
						</ul>
						<br/>
						<p>Снижение рейтинга означает его снижение до момента:</p>
						<ul>
							<li>
								Исправления ситуации
							</li>
							<li>
								Вашего бана {" "}
								<small>(игнор)</small>
							</li>
						</ul>
						<br/>
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
								<a href="https://www.twitch.tv/creatorcamp/ru-ru/urls/rules-policies-and-guidelines/?android-app-redirect=true"
								   target="_blank" className="twitch_url" rel="noopener noreferrer">
									платформы Twitch
								</a><br/>
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
										<a href="https://discord.gg/f95V9Rezqy" target="_blank"
										   className="ds_url" rel="noopener noreferrer">
											Получить согласие
										</a>
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
									<a target="_blank"
									   className="ds_url"
									   href="https://discord.gg/xGv8srKKsz"
									   rel="noopener noreferrer">
										Территории
									</a>
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
										Быть дальше, чем 180 блоков от нулевых координат
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
										разумного. Спавн разделён на 4 зоны, строительство строго по зонам
									</li>
									<li>
										Спавн ада
									</li>
									<li>
										Главный остров в энде и все его порталы
									</li>
								</ul>
							</Rule>
							<Rule number={3.6}>
								<p>
									Максимальная площадь территории на одного игрока - 300 блоков на 300 блоков{" "}
									<small>(90 000 метров²)</small>
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
									<a href="https://t.me/JustCheburek" target="_blank" className="tg_url"
									   rel="noopener noreferrer">Купить согласие</a>
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

						<RulesBox name="roles" heading="Роли" number={8}>
							<Rule number={8.1}>
								<p>
									Админ — главная часть сервера
								</p>
								<br/>
								<p>
									Разработка сайта, ведение соцсетей и самого сервера осуществляются именно ими
								</p>
								<br/>
								<p>
									Ники:
								</p>
								<ul>
									<li>
										<Link href="/user/JustCheburek" className="unic_color medium-font">JustCheburek</Link> <small>—
										чебурек</small>
									</li>
									<li>
										<Link href="/user/Kawa11Fox" className="unic_color medium-font">Kawa11Fox</Link> <small>—
										лиса</small>
									</li>
								</ul>
							</Rule>
							<Rule number={8.2}>
								<p>
									Модер — помощники админов
								</p>
								<p>
									Модерации запрещено абьюзить свои права
								</p>
								<a className="ds_url" href="https://discord.gg/swrAFFqvH2" target="_blank"
								   rel="noopener noreferrer">
									Стать модером
								</a>
							</Rule>
							<Rule number={8.3}>
								<p>
									Админы и модеры имеют бóльшие права, чем правила, итоговое решение остаётся за ними
								</p>
							</Rule>
							<Rule number={8.4}>
								<p>
									Мэр спавна — избирается админами или игроками в нашем телеграме на один сезон
								</p>
								<p>
									В течение и в конце сезона за ухоженный и красивый спавн получает мостики и социальный рейтинг
								</p>
								<a className="ds_url" href="https://discord.gg/AkZHn9q5KV" target="_blank"
								   rel="noopener noreferrer">
									Стать мэром
								</a>
							</Rule>
							<Rule number={8.5}>
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
										Стример: получает бонус 10% мостиков от суммы покупки
									</li>
								</ul>
							</Rule>
							<Rule number={8.6}>
								<p>
									Художник — рисует <Link href="/features/stickers" className="unic_color medium-font">стикеры</Link>
								</p>
								<a className="tg_url" href="https://t.me/MineBridgeOfficial/326" target="_blank"
								   rel="noopener noreferrer">
									Заказать
								</a>
							</Rule>
							<Rule number={8.7}>
								<p>
									Тестировщик — проверяет новые фичи сервера и сайта
								</p>
								<p>
									Можно получать от 5 соц рейтинга за каждый продуктивный тест
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
							<a className="ds_url" href="https://discord.gg/VtXNje8xHq" target="_blank"
							   rel="noopener noreferrer">
								Напишите репорт!
							</a>
						</p>
						<p className="red_line">
							Администрация не обязана уведомлять игроков об небольшом изменении правил. Игрок сам должен
							следить за изменениями в {" "}
							<a className="tg_url" href="https://t.me/MineBridgeOfficial" target="_blank"
							   rel="noopener noreferrer">
								Новостях проекта
							</a>
						</p>
					</div>

					<OnThisPage>
						<OnThisPageItem>
							Содержание
						</OnThisPageItem>
						<OnThisPageItem href="#general">
							<span className={styles.number_box}>1</span>
							Общение
						</OnThisPageItem>
						<OnThisPageItem href="#game_interferences">
							<span className={styles.number_box}>2</span>
							Игра
						</OnThisPageItem>
						<OnThisPageItem href="#areas">
							<span className={styles.number_box}>3</span>
							Территории
						</OnThisPageItem>
						<OnThisPageItem href="#cheats">
							<span className={styles.number_box}>4</span>
							Читы
						</OnThisPageItem>
						<OnThisPageItem href="#trading">
							<span className={styles.number_box}>5</span>
							Торговля
						</OnThisPageItem>
						<OnThisPageItem href="#unknown_url">
							<span className={styles.number_box}>6</span>
							Реклама
						</OnThisPageItem>
						<OnThisPageItem href="#lor">
							<span className={styles.number_box}>7</span>
							Лор
						</OnThisPageItem>
						<OnThisPageItem href="#roles">
							<span className={styles.number_box}>8</span>
							Роли
						</OnThisPageItem>
					</OnThisPage>
				</MaxSize>
			</main>)
}