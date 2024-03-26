import {Header} from "@components/header";
import {Footer} from "@components/footer";
import {Montserrat} from "next/font/google";
import type {Metadata} from "next";

// Стили
import "@styles/normalize.scss"
import "@styles/vars.scss"
import "@styles/text.scss"
import "@styles/urls.scss"
import "@styles/appear.scss"
import "@styles/button.scss"
import "@styles/global.scss"
import {MaxSize} from "@components/maxSize";
import {Url} from "@components/button";

const montserrat = Montserrat({subsets: ["latin"], preload: true, style: "normal"});

export const metadata: Metadata = {
	title: "404 | MineBridge",
	description: "Давно странник так не был далеко от цели...",
}

export default function NotFound() {
	return (
			<html lang="ru">
			<body className={montserrat.className}>
			<Header/>
			<main>
				<MaxSize className="center_text">
					<h1>А, где я?</h1>
					<h3>Кажется, я в мире майнкрафта!</h3>
					<Url href="/">Назад</Url>
				</MaxSize>
			</main>
			<Footer/>
			</body>
			</html>
	)
}