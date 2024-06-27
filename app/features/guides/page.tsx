// React
import type {Metadata} from "next";

// Стили
import styles from "../features.module.scss"

// Компоненты
import {RelativeNav} from "@components/relativeNav";
import {MaxSize} from "@components/maxSize";
import {GBox, GContainer, GHint, GText} from "@components/grid";
import {Img, ImgBox} from "@components/img";

export const metadata: Metadata = {
	title: "Гайды | Майнбридж",
	description: "Гайды всегда полезные, особенно от MineBridge!",
};

export default function Guides() {
	return (
			<MaxSize>
				<RelativeNav paths={[{name: "features", displayname: "Фичи"}, {name: "guides", displayname: "Гайды"}]}/>
				<h1>Гайды</h1>

				<GContainer border>
					<GBox href="/features/guides/crafts" imgs="two">
						<ImgBox type="grid">
							<Img src="/features/guides/crafts/light.png" alt="Свет" pixel/>
						</ImgBox>
						<ImgBox type="grid">
							<Img src="/features/guides/crafts/dragon_breath.webp" alt="Драконье дыхание" pixel/>
						</ImgBox>

						<GHint className="green_color">Перенос</GHint>
						<GText>Крафты</GText>
					</GBox>

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

					<GBox href="https://modrinth.com/datapack/joshs-more-foods" anotherSite imgs="one">
						<ImgBox type="grid">
							<Img
									src="https://cdn.modrinth.com/data/3BlwZj8w/ed994d6ec6b0aadca5c2942071f353f0224f4366.png"
									alt="Еда"
									pixel
							/>
						</ImgBox>

						<GHint className="red_color">Новинка</GHint>
						<GText>Еда</GText>
					</GBox>

					<GBox href="https://modrinth.com/datapack/tables-and-chairs" anotherSite imgs="one">
						<ImgBox type="grid">
							<Img
									src="https://cdn.modrinth.com/data/ElnjwLgg/cb30b6f5e8c309a9691bb999d6f7546d60d043cb.png"
									alt="Стул и стол"
									className="border-radius"
							/>
						</ImgBox>

						<GHint className="red_color">Новинка</GHint>
						<GText>Мебель</GText>
					</GBox>

					<GBox href="https://minecraft.wiki/w/Villager_Trade_Rebalance" anotherSite imgs="one">
						<ImgBox type="grid">
							<Img
									src="/features/guides/villager.png"
									alt="Житель"
							/>
						</ImgBox>

						<GHint className="red_color">Новинка</GHint>
						<GText>Жители</GText>
					</GBox>

					<GBox href="https://modrinth.com/datapack/villager-transportation" anotherSite imgs="one">
						<ImgBox type="grid">
							<Img
									src="/features/guides/villager.png"
									alt="Житель"
							/>
						</ImgBox>

						<GHint className="red_color">Новинка</GHint>
						<GText>Перенос жителей</GText>
					</GBox>

					{/*<Link href="/features/guides/litematica" className="box two crafts">
							<img src="/features/guides/litematica/house.jpg" alt="Дом из мема: ОЙ МАМА ПРИШЛА" className="img"/>
							<img src="/features/guides/blocks.png" alt="Блоки" className="img"/>

							<h3 className="text">Litematica</h3>
						</Link>*/}
				</GContainer>
			</MaxSize>
	)
}