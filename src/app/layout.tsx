// React / next
// noinspection JSUnusedGlobalSymbols
import type {Metadata} from "next";
import type {HTMLInputTypeAttribute, PropsWithChildren} from "react";
import {Montserrat} from "next/font/google";
import TimeAgo from "javascript-time-ago";
import ru from 'javascript-time-ago/locale/ru'
import {SpeedInsights} from "@vercel/speed-insights/next"

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

const montserrat = Montserrat({subsets: ["latin"], preload: true, style: "normal"});

export const metadata: Metadata = {
	title: "MineBridge",
	description: "Лучший нелицензионный майнкрафт сервер на новых версиях",
}

TimeAgo.addDefaultLocale(ru)

declare module '@tanstack/react-table' {
	// @ts-ignore
	interface ColumnMeta {
		className?: string,
		type?: HTMLInputTypeAttribute
		notEditable?: boolean
	}
}

export default function RootLayout(
		{
			children
		}: PropsWithChildren) {
	return (
			<html lang="ru">
			<body className={montserrat.className}>
			<Header/>
			{children}
			<Footer/>
			<SpeedInsights/>
			</body>
			</html>
	);
}
