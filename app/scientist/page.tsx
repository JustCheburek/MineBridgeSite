import {MaxSize} from "@components/maxSize";
import {H1} from "@components/h1";

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