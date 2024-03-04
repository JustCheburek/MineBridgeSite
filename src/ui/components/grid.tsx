// React
import Link from "next/link";
import type {PropsWithChildren} from "react";

// Стили
import styles from "./styles/grid.module.scss";

// Компоненты
import {AnotherSiteSvg} from "@ui/svgs";

type GContainer = {
	className?: string
	width?: number
	height?: number
	row?: number
	column?: number
	margin?: number
	border?: boolean
}

export const GContainer = (
		{
			children,
			className = "",
			width = 300,
			height = 250,
			row = 5,
			column = 2,
			margin = 3,
			border = false,
			...props
		}: PropsWithChildren<GContainer>) => (
		<div
				className={`${styles.container} ${border ? styles.box_border : ""} ${className}`}
				style={{
					"--_width": `${width}px`,
					"--_height": `${height}px`,
					rowGap: `${row}rem`,
					columnGap: `${column}rem`,
					marginBlock: `${margin}rem`
				}}
				{...props}
		>
			{children}
		</div>
)

type GBox = {
	className?: string
	href?: string
	anotherSite?: boolean
	imgs?: undefined | "one" | "two" | "three"
	target?: string
	rel?: string
}

export const GBox = (
		{
			children,
			href = "",
			anotherSite = false,
			imgs,
			target = "_blank",
			rel = "noopener noreferrer",
			className = ""
		}: PropsWithChildren<GBox>) => {
	const classNameResult = `${styles.box} ${imgs ? styles[imgs] : ""} ${className}`

	if (!href) {
		return (
				<div className={classNameResult}>
					{children}
					{anotherSite &&
							<AnotherSiteSvg className={styles.link}/>
					}
				</div>
		)
	}

	if (anotherSite) {
		return (
				<a href={href} target={target} rel={rel} className={classNameResult}>
					{children}
					<AnotherSiteSvg className={styles.link}/>
				</a>
		)
	}

	return (
			<Link
					href={href}
					className={classNameResult}
			>
				{children}
			</Link>
	)
}

export const GText = ({children}: PropsWithChildren) => (
		<h3 className={`${styles.text} center_text`}>
			{children}
		</h3>
)