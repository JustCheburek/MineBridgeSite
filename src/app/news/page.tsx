// React
import type {Metadata} from "next";
import Link from "next/link";

// Стили
import styles from "./news.module.scss"

// Компоненты
import {NotFound} from "@components/notFound";
import {Season} from "./components"
import {SubsectionItem, Subsections, OnThisPage, OnThisPageItem} from "@components/sideNav";
import {MaxSize} from "@components/maxSize";
import {PBox, PText, PTitle} from "@components/post";
import {Img, ImgBox} from "@components/img";

export const metadata: Metadata = {
	title: "Новости | Майнбридж",
	description: "Важнейшие новости, избираемые из телеграма майнбриджа. Здесь интересно!",
};

export default function News() {
	return (
			<main>
				<MaxSize sideNav>
					<Subsections menu="Меню новостей">
						<SubsectionItem href="/news">
							Новости
						</SubsectionItem>
						<SubsectionItem href="/news/events">
							Ивенты
						</SubsectionItem>
					</Subsections>

					<div className="news_content">
						<h1>Новости</h1>

						<Season
								number={5}
								startData={new Date(2023, 12 - 1, 10)}
								endData={new Date(2024, 6 - 1, 1)}
						/>

						<PBox createdAt={new Date(2024, 0, 21)}>
							<ImgBox type="post">
								<Img src="/news/elytra.png" alt="Крафт элитр"/>
							</ImgBox>
							<PTitle>
								<h2>Открытие энда</h2>
							</PTitle>
							<PText>
								<time dateTime="2024-01-27 11:00" className={styles.time}>
									27 января в 11:00 по МСК
								</time>
								<br/>
								<p>
									❌ Элитры теперь <strong>не спавнятся!</strong>
								</p>
								<p>
									✅ Элитры можно скрафтить с помощью <strong>яйца дракона</strong> 🥚
								</p>
								<p>
									🔮 Продолжение <strong>лора</strong>
								</p>
								<p>
									⚔️ <strong>ПВП за яйцо дракона</strong> на территориях портала энда и в самом измерении
									(воровать нельзя)
								</p>
								<p>
									🌴 <strong>Treecapitator</strong> (быстрая рубка дерева) остался!
									Нужно лишь, с зажатым Shift’ом, срубить топором дерево
								</p>
							</PText>
						</PBox>

						<PBox createdAt={new Date(2024, 0, 12)}>
							<ImgBox type="post">
								<Img src="/shop/sell_mobile.svg" alt="Распродажа"/>
							</ImgBox>
							<PTitle>
								<h2>Распродажа</h2>
							</PTitle>
							<PText>
								<p>
									Цены на всех стикеры были ниже на <strong className="unic_color">30%</strong>
								</p>
								<br/>
								<h3>
									😎 Coolpilot2010:
								</h3>
								<p>
									Стандарт - 30 мостиков
								</p>
								<p>
									Экспресс - 55 мостиков
								</p>
								<br/>
								<h3>
									🦊 Kawa11Fox:
								</h3>
								<p>
									Премиум - 140 мостиков
								</p>
								<p>
									Делюкс - 210 мостиков
								</p>
							</PText>
						</PBox>

						<PBox createdAt={new Date(2024, 0, 9)}>
							<PTitle>
								<h2>Мониторинг сервера</h2>
							</PTitle>
							<PText>
								<p>
									🆕 Теперь на них есть больше полезной и актуальной информации
								</p>
								<br/>
								<p>
									Мы оставили всего <strong>2 основных мониторинга</strong>, чтобы вам было легче
									голосовать
								</p>
								<br/>
								<p>
									🎁 Если вы набрали больше 5 голосов, тогда <strong>1 голос</strong> = <strong>1
									мостик</strong>
								</p>
								<br/>
								<p>
									❓ Ваш голос напрямую зависит от <strong>онлайна сервера</strong>
								</p>
							</PText>
						</PBox>

						<Season
								number={4}
								startData={new Date(2023, 6 - 1, 3)}
								endData={new Date(2023, 12 - 1, 9)}
						/>

						<PBox>
							<ImgBox type="post">
								<Img src="/news/pvp_arena.webp" alt="ПВП Арена"/>
							</ImgBox>
							<PTitle>
								<h2>ПВП Арена</h2>
							</PTitle>
							<PText>
								<p>
									Kawa11Fox устроила ивент, в котором были большие призы, ставки и пвп сражения!
								</p>
								<a
										className="unic_color medium-font"
										rel="noreferrer noopener"
										href="https://youtu.be/i70i7TWtUuI"
										target="_blank"
								>
									Видео об этом ивенте
								</a>
							</PText>
						</PBox>

						<PBox>
							<ImgBox type="post">
								<Img src="/news/social.webp" alt="Баллы"/>
							</ImgBox>
							<PTitle>
								<h2>Баллы</h2>
							</PTitle>
							<PText>
								<h3>Мостики теперь социальный рейтинг</h3>
								<p>Изначальное количество - <strong className="unic_color">0</strong></p>
								<p>Вы сможете понижать и поднимать рейтинг с помощью своих действий</p>
								<br/>
								<h3>Примеры:</h3>
								<p>Помощь в постройке спавна — +35 рейтинга</p>
								<p>Банворд — -35 рейтинга</p>
								<Link href="/rules#social" className="unic_color">Подробнее...</Link>
								<br/><br/>
								<h3>
									Баллы покупок - {`"`}новые мостики{`"`}
								</h3>
								<p>
									Донатная валюта
								</p>
							</PText>
						</PBox>

						<PBox>
							<ImgBox type="post">
								<Img src="/news/assassin.webp" alt="Ассасинская бойня"/>
							</ImgBox>
							<PTitle>
								<h2>
									<a
											href="https://discord.com/channels/1012334719230292048/1132991350833434672"
											rel="noreferrer noopener"
											target="_blank"
									>
										Ассасинская бойня
									</a>
								</h2>
							</PTitle>
							<PText>
								<p>Каждый участник получает майнкрафт ник на бумажке в майнкрафте</p>
								<br/>
								<h3>Задача:</h3>
								<p>
									Прийти к этому игроку и кинуть бумажку с его ником. Это означает, что ты его убил.
									После этого ты получаешь бумажку с ником следующего игрока от погибшего.
									Если другие игроки заметили убийство, тогда ты выбываешь из игры
								</p>
								<br/>
								<h4>Приз: <Link className="unic_color" href="/shop">2 легендарных кейса</Link>!</h4>
								<h4>Координаты: <span className="unic_color">-38 112 100</span></h4>
								<h4>Победитель: <span className="unic_color">Kawa11Fox</span></h4>
							</PText>
						</PBox>

						<PBox>
							<ImgBox type="post">
								<Img src="/news/bestbuilding.webp" alt="Лучшая постройка"/>
							</ImgBox>
							<PTitle>
								<h2>Лучшая постройка</h2>
							</PTitle>
							<PText>
								<h4>Постройки принимаются по всем 3-ём мирам Майнбридж!</h4>
								<br/>
								<h3>Задача:</h3>
								<p>
									Построить наилучшую по красоте (или показать уже вашу существующую) базу / здание
								</p>
								<br/>
								<h4>Приз: <Link className="unic_color" href="/shop">Легендарный кейс</Link>!</h4>
								<h4>
									Победитель: <span className="unic_color">SES</span>
								</h4>
							</PText>
						</PBox>

						<PBox>
							<ImgBox type="post">
								<Img src="/news/ender.webp" alt="Открытие энда"/>
							</ImgBox>
							<PTitle>
								<h2>Открытие энда</h2>
							</PTitle>
							<PText>
								<time dateTime="2023-06-26 10:00" className={styles.time}>
									26.06.23 (понедельник) в 10:00 по МСК!
								</time>
								<br/>
								Теперь вы сможете насладиться не только базовыми возможностями, но и уникальными
								дополнениями:
								<ul>
									<li>
										В кораблях теперь спрятаны целых 2 элитры!
									</li>
									<li>
										По всему Энду раскиданы новые данжи с редким лутом!
									</li>
								</ul>
							</PText>
						</PBox>

						<Season
								number={3}
								startData={new Date(2023, 3 - 1, 25)}
								endData={new Date(2023, 6 - 1, 20)}
								link="https://drive.google.com/file/d/1Y1JVPvExycqfVzJiUiOR_kpIL9rXRu-Z/view?usp=drive_link"
						/>

						<PBox>
							<ImgBox type="post">
								<Img src="/news/players.webp" alt="Игроки"/>
							</ImgBox>
							<PTitle>
								<h2>Конкурс в вк</h2>
							</PTitle>
							<PText>
								<a target="_blank" href="https://vk.com/minebridge" rel="noopener noreferrer">
									Во <span className="unic_color">ВК</span> проходила крутая раздача на:
								</a>
								<ul>
									<li>
										3 легендарных кейса - <span className="unic_color medium-font">CattIk0</span>
									</li>
									<li>
										Попадание в стикер пак - <span className="unic_color medium-font">TOXSER</span>
									</li>
									<li>
										Получение безлимитных попыток у ChatGPT и MidJourney на неделю в нашем телеграм боте
										- <span className="unic_color medium-font">coolpilot2010</span>
									</li>
								</ul>
							</PText>
						</PBox>

						<PBox>
							<ImgBox type="post">
								<Img src="/news/ender.webp" alt="Открытие энда"/>
							</ImgBox>
							<PTitle>
								<h2>Открытие энда</h2>
							</PTitle>
							<PText>
								<time dateTime="2023-04-15 11:00" className={styles.time}>
									15.04.23 (суббота) в 11:00 по МСК!
								</time>
							</PText>
						</PBox>

						<Season
								number={2}
								startData={new Date(2022, 11 - 1, 26)}
								endData={new Date(2023, 3 - 1, 20)}
						/>

						<PBox>
							<ImgBox type="post">
								<Img src="/news/map.webp" alt="Карта сервера"/>
							</ImgBox>
							<PTitle>
								<h2>Карта сервера</h2>
							</PTitle>
							<PText>
								<p>На нашем сервере впервые появилась {" "}
									<strong className="unic_color">
										карта сервера
									</strong>!
								</p>
								<time dateTime="2023-01-15" className={styles.time}>15.01.23</time>
							</PText>
						</PBox>

						<PBox>
							<ImgBox type="post">
								<Img src="/news/ender.webp" alt="Открытие энда"/>
							</ImgBox>
							<PTitle>
								<h2>Открытие энда</h2>
							</PTitle>
							<PText>
								<time dateTime="2022-12-10 9:00" className={styles.time}>
									10.12.22 в 9:00 по МСК
								</time>
							</PText>
						</PBox>

						<Season
								number={1}
								startData={new Date(2022, 9 - 1, 10)}
								endData={new Date(2022, 11 - 1, 6)}
						/>

						<PBox className="center_text">
							<ImgBox type="post">
								<Img src="/news/grifer.webp" alt="Coreprotect"/>
							</ImgBox>
							<PTitle>
								<h2>Coreprotect</h2>
							</PTitle>
							<PText>
								<p>Плагин на защиту от гриферов</p>
								<p>/co i - команда на проверку блока</p>
							</PText>
						</PBox>

						<PBox>
							<ImgBox type="post">
								<Img src="/news/ender.webp" alt="Открытие энда"/>
							</ImgBox>
							<PTitle>
								<h2>Открытие энда</h2>
							</PTitle>
							<PText>
								<time dateTime="2022-09-24 9:30" className={`${styles.time} ${styles.description}`}>
									24.09.22 в 9:30 по МСК
								</time>
							</PText>
						</PBox>

						<PBox className="center_text">
							<ImgBox type="post">
								<Img src="/news/grifer.webp" alt="Белый список"/>
							</ImgBox>
							<PTitle>
								<h2>Белый список</h2>
							</PTitle>
							<PText>
								<p>Теперь, чтобы попасть на сервер, нужно подать заявку</p>
								<time dateTime="2022-09-17" className={styles.time}>17.09.22</time>
							</PText>
						</PBox>

						<NotFound buttonText="Телеграм" href="https://t.me/MineBridgeOfficial">
							Если вы всё равно не нашли новость, можете перейти в телеграм канал и поискать там!
						</NotFound>
					</div>

					<OnThisPage>
						<OnThisPageItem>
							Сезоны
						</OnThisPageItem>
						<OnThisPageItem href="#5season">
							5 сезон
						</OnThisPageItem>
						<OnThisPageItem href="#4season">
							4 сезон
						</OnThisPageItem>
						<OnThisPageItem href="#3season">
							3 сезон
						</OnThisPageItem>
						<OnThisPageItem href="#2season">
							2 сезон
						</OnThisPageItem>
						<OnThisPageItem href="#1season">
							1 сезон
						</OnThisPageItem>
					</OnThisPage>
				</MaxSize>
			</main>
	)
}