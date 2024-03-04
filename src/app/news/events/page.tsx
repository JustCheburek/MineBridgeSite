// Стили
import {SubsectionItem, Subsections} from "@components/subsections";
import {OnThisPage} from "@components/onThisPage";
import {MaxSize} from "@components/maxSize";
import type {Metadata} from "next";

export const metadata: Metadata = {
	title: "Ивенты | Майнбридж",
	description: "Поинты ивентов (ПИ) — внутриигровые награды за создания ивентов. 1 ивент = до 5 ПИ, 1 ПИ = 25 рейтинга!",
};

export default function Events() {
	return (
			<main className="news">
				<MaxSize sideNav>
					<Subsections menu="Меню новостей">
						<SubsectionItem href="/news">
							Новости
						</SubsectionItem>
						<SubsectionItem href="/news/events">
							Ивенты
						</SubsectionItem>
					</Subsections>

					<div className="events_content">
						<h1>Ивенты</h1>

						<div>
							<p>
								На сервере действуют особые {" "}
								<strong className="unic_color">
									поинты ивентов
								</strong> или {" "}
								<strong className="unic_color">
									ПИ
								</strong>
							</p>
							<br/>
							<p>
								За <strong>1 ивент</strong> можно получить до <strong>5 ПИ</strong>
							</p>
							<p>
								<strong>1 ПИ</strong> = <strong>25 рейтинга</strong>
							</p>
							<p>
								Если ивент нарушает правила сервера, то ПИ <strong>не начисляются</strong>
							</p>
							<br/>
							<h4>
								Критерии ивентов:
							</h4>
							<ol>
								<li>
									Уникальность
								</li>
								<li>
									Объём
								</li>
								<li>
									Красота
								</li>
								<li>
									Затрата ресурсов
								</li>
							</ol>
							<br/>
							<h4>
								Накопления:
							</h4>
							<ul className="remove_marker">
								<li>
									<strong className="unic_color">JustCheburek</strong>: 7 ПИ
								</li>
								<li>
									<strong className="unic_color">Kawa11Fox</strong>: 6 ПИ
								</li>
								<li>
									<strong className="unic_color">han_world</strong>: 3 ПИ
								</li>
								<li>
									<strong className="unic_color">sodplayy</strong>: 2 ПИ
								</li>
							</ul>
						</div>
					</div>

					<OnThisPage>
						{/*<OnThisPageItem>
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
                    </OnThisPageItem>*/}
					</OnThisPage>
				</MaxSize>
			</main>
	)
}