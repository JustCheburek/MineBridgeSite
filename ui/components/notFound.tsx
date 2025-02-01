// React
import type {PropsWithChildren} from "react";

// Стили
import styles from "./styles/notFound.module.scss"

// Компоненты
import {Url} from "./button";
import {SearchSvg} from "@ui/SVGS";

export function NotFound({children, buttonText, href}: PropsWithChildren<{ buttonText: string, href: string }>) {
	return (
			<section className={`for_pc ${styles.not_found}`}>
				<SearchSvg size="8rem" className={`unic_color ${styles.search_svg}`}/>
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
