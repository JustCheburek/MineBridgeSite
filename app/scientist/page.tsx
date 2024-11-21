import {MaxSize} from "@components/maxSize";
import {H1} from "@components/h1";
import type {Metadata} from "next";

export const metadata: Metadata = {
	title: "Запись учёного",
	description: "Лоооор! 6 сезон!",
	openGraph: {
		videos: ["https://youtu.be/5dg0SFRSDh4"]
	},
};

export default function Scientist() {
	return (
			<MaxSize>
				<H1>Запись учёного</H1>

				<iframe
						src="https://www.youtube.com/embed/5dg0SFRSDh4?si=6SHxLhNQIA25s_vH"
						frameBorder="0"
						allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
						referrerPolicy="strict-origin-when-cross-origin" allowFullScreen
				/>
			</MaxSize>
	)
}