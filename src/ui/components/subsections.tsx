"use client";

// React
import {useState} from "react";
import type {PropsWithChildren} from "react";

// Стиль
import "./styles/sideNav.scss";
import "./styles/subsections.scss";

// Компоненты
import {NavLink} from "@components/navlink";

export function Subsections({children, menu}: PropsWithChildren<{ menu: string }>) {
	const [burger, setBurger] = useState(false)

	function toggleBurger() {
		setBurger(prev => !prev)
	}

	function closeBurger() {
		setBurger(false)
	}

	return (
			<nav className={`subsections_container side_nav_container ${burger ? "burger_active" : ""}`}>
				{/* Бургер иконка */}
				<button
						className="for_mobile burger_subsections"
						onClick={toggleBurger}
				>
          <span className={`burger_icon ${burger ? "burger_active" : ""}`}>
              <div className="burger_stick"/>
              <div className="burger_stick"/>
              <div className="burger_stick short"/>
          </span>
					<h3>
						{menu}
					</h3>
				</button>

				<ul className="not_indent subsections_box side_nav_box remove_marker" onClick={closeBurger}>
					{children}
				</ul>
			</nav>
	)
}

type SubsectionItem = {
	href?: string
	className?: string
}

export const SubsectionItem = ({children, href, className}: PropsWithChildren<SubsectionItem>) => (
		<li className="subsection_item side_nav_item medium-font">
			{href
					? <NavLink href={href} exact className={`white_color ${className}`}>
						{children}
					</NavLink>
					: <p className={className}>
						{children}
					</p>
			}
		</li>
)