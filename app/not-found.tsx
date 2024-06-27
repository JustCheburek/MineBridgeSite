import {MaxSize} from "@components/maxSize";
import {Url} from "@components/button";

export default function NotFound() {
	return (
			<MaxSize className="center_text">
				<h1>А, где я?</h1>
				<h3>Кажется, я в мире майнкрафта!</h3>
				<Url href="/">Назад</Url>
			</MaxSize>
	)
}