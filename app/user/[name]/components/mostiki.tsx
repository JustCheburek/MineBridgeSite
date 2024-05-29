"use client"

// React
import type {User} from "lucia";
import Link from "next/link";

// Utils
import {ColorText} from "@app/utils";

// Компоненты
import {MostikiSvg} from "@ui/svgs";

export const Mostiki = ({user}: { user: User }) => {
	return (
		<h4>
			Мостики: {" "}
			<strong className={ColorText(user.mostiki)}>
				{user.mostiki}
			</strong> {" "}
			<MostikiSvg/> {" "}
			<Link href="/shop" className="add">+</Link>
		</h4>
	)
}