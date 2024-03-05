// React
import type {Metadata} from "next";

// Стили
import styles from "./streamers.module.scss"

// Компоненты
import {RelativeNav} from "@components/relativeNav";
import {MaxSize} from "@components/maxSize";
import {GBox, GContainer} from "@components/grid";
import {Img, ImgBox} from "@components/img";
import {TwitchSvg, YtSvg} from "@ui/svgs";

export const metadata: Metadata = {
	title: "Контент мейкеры | Майнбридж",
	description: "Очень креативные игроки!",
};

export default function Streamers() {
	const streamers = [{
		name: "JustCheburek",
		yt: "JustCheburek",
		twitch: "justcheburek"
	}, {
		name: "Kawa11Fox",
		yt: "Kawa11Fox",
		twitch: "kawa11fox"
	}, {
		name: "rkrmv",
		twitch: "rkrmv"
	}, {
		name: "Vebray",
		yt: "Vebray_"
	}, {
		name: "TOXSER",
		yt: "TOXwyr"
	}]

	return (
			<main className="streamers">
				<MaxSize>
					<RelativeNav
							paths={[{name: "features", displayname: "Фичи"}, {name: "streamers", displayname: "Контент мейкеры"}]}/>
					<h1>Контент мейкеры</h1>

					<GContainer width={300} height={250} border>
						{streamers.map(({name, yt, twitch}) => (
								<GBox key={name}>
									<ImgBox hover={1.1} width="100%" height="70%">
										<Img src={`/features/streamers/${name}.png`} alt={name} width={160} pixel/>
									</ImgBox>

									<ul className={`${styles.social} remove_marker not_indent`}>
										{yt &&
												<li>
													{/* Ютуб */}
													<a href={`https://www.youtube.com/@${yt}`} target="_blank" rel="noreferrer noopener">
														<YtSvg width="100%" height="75%"/>
													</a>
												</li>
										}
										{twitch &&
												<li>
													{/* Твич */}
													<a href={`https://www.twitch.tv/${twitch}`} target="_blank" rel="noreferrer noopener">
														<TwitchSvg width="100%" height="67%"/>
													</a>
												</li>
										}
									</ul>
								</GBox>
						))}
					</GContainer>
				</MaxSize>
			</main>
	)
}