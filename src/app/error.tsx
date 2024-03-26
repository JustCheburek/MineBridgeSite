'use client'

import {useEffect} from "react";
import type {Metadata} from "next";
import {Montserrat} from "next/font/google";
import {MaxSize} from "@components/maxSize";
import {Button, Url} from "@components/button";

// Стили
import "@styles/normalize.scss"
import "@styles/vars.scss"
import "@styles/text.scss"
import "@styles/urls.scss"
import "@styles/appear.scss"
import "@styles/button.scss"
import "@styles/global.scss"

const montserrat = Montserrat({subsets: ["latin"], preload: true, style: "normal"});

export const metadata: Metadata = {
	title: "404 | MineBridge",
	description: "Давно странник так не был далеко от цели...",
}

export default function Error(
		{
			error,
			reset,
		}: {
			error: Error & { digest?: string }
			reset: () => void
		}) {

	useEffect(() => {
		// Log the error to an error reporting service
		console.error(error)
	}, [error])

	return (
			<html lang="ru">
			<body className={montserrat.className}>
			<main>
				<MaxSize className="center_text">
					<h1>Как это?</h1>
					<h2>Кажется, вы что-то сделали не то</h2>
					<Button onClick={() => reset()}>Перезагрузить</Button>
					<Url href="/">Назад</Url>
				</MaxSize>
			</main>
			</body>
			</html>
	)
}