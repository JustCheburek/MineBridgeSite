'use client'

import {useEffect} from "react";
import {MaxSize} from "@components/maxSize";
import {Button, Url} from "@components/button";

export default function Error(
		{
			error,
			reset,
		}: {
			error: Error
			reset: () => void
		}) {

	useEffect(() => {
		console.error(error)
	}, [error])

	return (
			<main>
				<MaxSize className="center_text">
					<h1>{error.name}</h1>
					<h3>{error.message}</h3>
					<Button onClick={() => reset()}>Перезагрузить</Button>
					<Url href="/">Назад</Url>
				</MaxSize>
			</main>
	)
}