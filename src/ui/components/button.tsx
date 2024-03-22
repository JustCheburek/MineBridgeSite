// React
import type {ComponentPropsWithoutRef, PropsWithChildren} from "react";
import Link, {LinkProps} from "next/link";

// Стили
import styles from "./styles/button.module.scss"

type Url = {
	margin?: string
	target?: string
	className?: string
}

export const Url = (
		{
			href,
			children,
			target,
			className = "",
			margin = "2.5rem",
			...props
		}: PropsWithChildren<Url> & LinkProps) => (
		<Link
				href={href}
				target={
					target
							? target
							: href.toString().startsWith("http")
									? "_blank"
									: "_self"
				}
				className={`${styles.button} ${className}`}
				style={{marginBlock: margin}}
				{...props}
		>
			{children}
		</Link>
)

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