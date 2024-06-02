// React
import type {Metadata} from "next";

// Стили
import styles from "./streamers.module.scss"

// Компоненты
import {RelativeNav} from "@components/relativeNav";
import {MaxSize} from "@components/maxSize";
import {TwitchSvg, YtSvg} from "@ui/svgs";
import {UserBox} from "@components/userBox";
import Link from "next/link";

export const metadata: Metadata = {
	title: "Контент мейкеры | Майнбридж",
	description: "Очень креативные игроки!",
};

export default function Streamers() {
	const streamers = [{
		_id: "i5mqq2js4nos1yj",
		yt: "Kawa11Fox",
		twitch: "kawa11fox"
	}, {
		_id: "j8bsrsdgzqa4n0c",
		yt: "JustCheburek",
		twitch: "justcheburek"
	}, {
		_id: "cds85p9u89qfyn1",
		twitch: "rkrmv"
	}, {
		_id: "t2dhhl5igw1sp43",
		yt: "Vebray_"
	}]

	return (
			<main className="streamers">
				<MaxSize>
					<RelativeNav
							paths={[{name: "features", displayname: "Фичи"}, {name: "streamers", displayname: "Контент мейкеры"}]}
					/>
					<h1>Контент мейкеры</h1>
					<p className="center_text">Разрабатывается интеграция в аккаунты</p>

					<div className="grid_center">
						{streamers.map(({_id, yt, twitch}) => (
								<div className={styles.social} key={_id}>
									<UserBox _id={_id}/>

									<div className={styles.icons}>
										{yt && <Link href={`https://www.youtube.com/@${yt}`} target="_blank">
											<YtSvg width="3em"/>
										</Link>}

										{twitch && <Link href={`https://www.twitch.tv/${twitch}`} target="_blank">
											<TwitchSvg width="3em"/>
										</Link>}
									</div>
								</div>
						))}
					</div>
				</MaxSize>
			</main>
	)
}