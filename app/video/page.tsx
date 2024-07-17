import {MaxSize} from "@components/maxSize";
import {H1} from "@components/h1";

export default function Scientist() {
	return (
			<MaxSize>
				<H1>Запись в аду</H1>

				<iframe
						src="https://www.youtube.com/embed/XavIL238_FA?si=MfqXr_2tr3vKi3gK"
						frameBorder="0"
						allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
						referrerPolicy="strict-origin-when-cross-origin" allowFullScreen
				/>
			</MaxSize>
	)
}