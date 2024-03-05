// React
import type {Metadata} from "next";

// Компоненты
import {BlacklistContent} from "@app/rules/blacklist/components";

export const metadata: Metadata = {
	title: "Выражения | Майнбридж",
	description: "Список запреток на Twitch, которые строго запрещены и у нас на сервере!",
};

export default function Blacklist() {
	return (
			<BlacklistContent/>
	)
}

