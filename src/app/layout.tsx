// React / next
import type {Metadata} from "next";
import type {PropsWithChildren} from "react";
import {Montserrat} from "next/font/google";

// Стили
import "@styles/normalize.scss"
import "@styles/vars.scss"
import "@styles/text.scss"
import "@styles/urls.scss"
import "@styles/appear.scss"
import "@styles/button.scss"
import "@styles/global.scss"

// Компоненты
import {Header} from "@components/header";
import {Footer} from "@components/footer";

const montserrat = Montserrat({subsets: ["latin"]});

export const metadata: Metadata = {
	title: "MineBridge",
	description: "Лучший нелицензионный майнкрафт сервер на новых версиях",
}

export default function RootLayout(
		{
			children,
		}: Readonly<PropsWithChildren>) {
	return (
			<html lang="ru">
			<body className={montserrat.className}>
			<Header/>
			{children}
			<Footer/>
			</body>
			</html>
	);
}
