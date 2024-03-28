'use client'

import {useEffect} from "react";
import {MaxSize} from "@components/maxSize";
import {Button, Url} from "@components/button";

export default function Error(
		{
			error,
			reset,
		}: {
			error: Error & { digest?: string }
			reset: () => void
		}) {

	useEffect(() => {
		console.error(error)
	}, [error])

	return (
			<main>
				<MaxSize className="center_text">
					<h1>Как это?</h1>
					<h2>Кажется, вы что-то сделали не то</h2>
					<Button onClick={() => reset()}>Перезагрузить</Button>
					<Url href="/">Назад</Url>
				</MaxSize>
			</main>
	)
}