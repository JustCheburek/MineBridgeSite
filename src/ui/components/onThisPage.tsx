// React
import Link from "next/link";

// Стили
import './styles/sideNav.scss';
import './styles/onThisPage.scss';
import type {PropsWithChildren} from "react";

export const OnThisPage = ({children}: PropsWithChildren) => (
		<nav className="on_this_page_container side_nav_container for_pc">
			<ul className="not_indent on_this_page_box side_nav_box remove_marker">
				{children}
			</ul>
		</nav>
)

export const OnThisPageItem = ({children, href}: PropsWithChildren<{ href?: string }>) => (
		<li className="on_this_page_item side_nav_item">
			{href
					? <Link href={href}>{children}</Link>
					: <h3 className="unic_color">{children}</h3>
			}
		</li>
)

export const OnThisPageBox = ({children}: PropsWithChildren) => (
		<li>
			<ul className="remove_marker on_this_page_box side_nav_box">
				{children}
			</ul>
		</li>
)