// React
import type {Metadata} from "next";

// Стили
import styles from "../features.module.scss"

// Компоненты
import {RelativeNav} from "@components/relativeNav";
import {MaxSize} from "@components/maxSize";
import {GBox, GContainer, GText} from "@components/grid";
import {Img, ImgBox} from "@components/img";

export const metadata: Metadata = {
	title: "Гайды | Майнбридж",
	description: "Гайды всегда полезные, особенно от MineBridge!",
};

export default function Guides() {
	return (
			<main>
				<MaxSize>
					<RelativeNav paths={[{name: "features", displayname: "Фичи"}, {name: "guides", displayname: "Гайды"}]}/>
					<h1>Гайды</h1>

					<GContainer border>
						<GBox href="/features/guides/brewery" imgs="three">
							<ImgBox className={styles.img} type="grid">
								<Img
										src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAABK0lEQVR4XmMYBaMhMBoCoyEwGgLkhsDFHI//IAzTj84n1lymgY4CFnIdcOTUObDWi4++/AcxjoQokWUU05BLhBvPvvwPwrgcTkgeXd/QSQOwuM6ovQb2BCwUinImongqNSINRd7fWJwRXzQPeAgwEkqEMJ+7OkeDlc5eMQtMd0x6CKY/v7qEYsT3D/cg4m+ugmm3jEIwvaTYAatdQycN8IpoYw2sX99eg8XZuETBNKcAaeXB4A+BB6+/ovi8umYzCv/3j3coIRCbZATmz5n8goEYMPhDYPWB6yipGuYrWFyzsPODhWCpn4EBEgIfn5+GKrXBGxCDvxyAOT+m9wC41ts1ox8shJ4r0opCwOK9VY1gmlD+h5k7dEIAPSQYCABcJR+6tqHXHmAYbgAAR29oifwpnJwAAAAASUVORK5CYII="
										alt="Оседающее зелье"
										pixel
								/>
							</ImgBox>
							<ImgBox className={styles.img} type="grid">
								<Img
										src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAABUElEQVR4XmMYBSM+BBjJDYGLOR7/kfVeu3UXzI3cdZskM5kGOgpIDoGLj76Aff7z9Hqsbn+u4AYW9zcWJ8rsAQ8BFlKj4MHrr2At32Y2oWh99+EjmC8z/TJJRjIN2Wy48ezL/yAM80BM74H/IEyqhwY8BEYdQHIaBJUDsLIAm2ZS08LQKQlhvs6ovQb2eEWePJguypmIEhCf31wF890yCsH0kmIHvCXi4A8BmM9dnaPBPpq9YhaY7pj0EEx/fnUJJQS+f7gHEScyJIZOXcAroo01x/z69hoszsYlCqY5BZRIylmDPwRgtR/MW9U1m1F8+PvHO5QQiE0yAvPnTH5BVEgM/hBYfeA6SqqGeQsW1yzs/GAhWOpnYICEwMfnp6FKbfCGxNApCWF1/a4Z/WAfoeeKtKIQsHhvVSOYHj4lIXoEEtvqIVQHwMwdum1ChuECAAkBeDEWsEl+AAAAAElFTkSuQmCC"
										alt="Зелье"
										pixel
								/>
							</ImgBox>
							<ImgBox className={styles.img} type="grid">
								<Img
										src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAABVUlEQVR4XmMYBSM+BBhpFQIXczz+I5utP2UHVruYBjoKWKjtAHSfX7t1F68VwycEYnoPgOP8yMowsI+FBPiJCtyhHwIbz74E+9zfWBycypdA/T3VjOE/MUEw4CFAdjmA7nOYb2HiTzJ1wULZp17htWPopYGLj76A41Zfjgevzwj5HBZiQycEYD7PqL0GdjwsrotyJqIk9tSINBR5WO7AlSMGfy6A+dzVORrsidkrZoHpjkkPwfTnV5dQPPf9wz2I+JurYNotoxBMLyl2GOK1Ia+INtZo/PXtNVicjUsUTHMKKDGQAgZ/Lnjw+iuKh6prNqPwf/94hxICsUlGYP6cyS+ICoihUw58hqZqmLdgcc3CDqn3YamfgQESAh+fn4YqtcEbEkOnNoS1eHbN6Af7CD1XpBWFgMV7qxrBNKH8DwuWodcegIUEoSSOq+RD1zfgIcAw4gEAmmZsshnsesIAAAAASUVORK5CYII="
										alt="Взрывное зелье"
										pixel
								/>
							</ImgBox>

							<GText>Brewery</GText>
						</GBox>

						{/*<Link href="/features/guides/litematica" className="box two crafts">
							<img src="/features/guides/litematica/house.jpg" alt="Дом из мема: ОЙ МАМА ПРИШЛА" className="img"/>
							<img src="/features/guides/blocks.png" alt="Блоки" className="img"/>

							<h3 className="text">Litematica</h3>
						</Link>*/}
					</GContainer>

					{/*
                <div className="container" id="litematica">
                    <h2 className="heading">Лайтматика</h2>

                    <div className="description">
                        <h3>
                            Установка
                        </h3>
                        <a href="https://www.curseforge.com/minecraft/mc-mods/litematica">
                            Скачиваем Litematica, закидываем в папку .minecraft/mods, запускаем майн
                        </a>
                        <h3>
                            Создание схемы
                        </h3>
                        <p>
                            
                        </p>
                        <h3>
                            Размещение
                        </h3>
                    </div>
                </div>*/}
				</MaxSize>
			</main>
	)
}