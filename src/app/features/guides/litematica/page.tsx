// React
import type {Metadata} from "next";

// Компоненты
import {RelativeNav} from "@components/relativeNav";
import {MaxSize} from "@components/maxSize";

export const metadata: Metadata = {
	title: "Litematica | Майнбридж",
	description: "Здесь можно быстро и понятно влится в лайтматику!",
};

export default function Litematica() {
	return (
			<main className="litematica">
				<MaxSize>
					<RelativeNav paths={[{name: "features", displayname: "Фичи"}, {name: "guides", displayname: "Гайды"}, {name: "Litematica", displayname: "Litematica"}]}/>
					<h1>Litematica</h1>
				</MaxSize>
			</main>
	)
}