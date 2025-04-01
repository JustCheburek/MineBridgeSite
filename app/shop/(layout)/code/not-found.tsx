import {MaxSize} from "@components/maxSize";
import {Url} from "@components/button";
import {H1} from "@components/h1";

export default function NotFound() {
	return (
			<MaxSize className="center_text">
				<H1>Код не найден</H1>
				<Url href="/shop/">Вернутся</Url>
			</MaxSize>
	)
}