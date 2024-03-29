// React
import type {ComponentPropsWithoutRef, PropsWithChildren} from "react";
import Link, {LinkProps} from "next/link";

// Стили
import styles from "./styles/button.module.scss"

type Url = {
	margin?: string
	target?: string
	className?: string
	download?: boolean
}

export const Url = (
		{
			href,
			children,
			target,
			className = "",
			margin = "2.5rem",
			download = false,
			...props
		}: PropsWithChildren<Url> & LinkProps) => {

	if (!target) {
		if (download || href.toString().startsWith("http")) {
			target = "_blank"
		} else {
			target = "_self"
		}
	}

	return (
			<Link
					href={href}
					target={target}
					className={`${styles.button} ${className}`}
					style={{marginBlock: margin}}
					download={download}
					{...props}
			>
				{children}
			</Link>
	)
}

type Button = {
	margin?: string
}

export const Button = (
		{
			children,
			className = "",
			margin = "2.5rem",
			...props
		}: ComponentPropsWithoutRef<"button"> & Button) => (
		<button
				className={`${styles.button} ${className}`}
				style={{marginBlock: margin}}
				{...props}
		>
			{children}
		</button>
)