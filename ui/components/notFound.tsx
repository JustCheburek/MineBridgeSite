// React
import type {PropsWithChildren} from "react";

// Стили
import "./styles/notFound.scss"

// Компоненты
import {Url} from "./button";
import {SearchSvg} from "@ui/SVGS";

export function NotFound({children, buttonText, href}: PropsWithChildren<{ buttonText: string, href: string }>) {
	return (
			<section className="not_found for_pc">
				<SearchSvg size="8rem" className="unic_color"/>
				<h3 className="unic_color">
					Не нашли нужную информацию?
				</h3>

				<p>
					Нажмите <code>CTRL + F</code> на windows или <code>CMD + F</code> на мак<br/>
					{children}
				</p>

				{/* Кнопка */}
				<Url href={href} margin="10px">
					{buttonText}
				</Url>
			</section>
	);
}
