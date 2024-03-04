// React
import type {PropsWithChildren} from "react";
import Link from "next/link";

// Стили
import styles from "./styles/button.module.scss"

type Url = {
	href: string
	className?: string
	target?: string
	margin?: string
}

export const Url = (
		{
			href,
			children,
			className = "",
			target = "_blank",
			margin = "2.5rem",
			...props
		}: PropsWithChildren<Url>) => (
		<a
				href={href}
				target={target}
				className={`${styles.button} ${className}`}
				style={{marginBlock: margin}}
				rel="noopener noreferrer"
				{...props}
		>
			{children}
		</a>
)

type NavButton = {
	href: string
	className?: string
	margin?: string
}

export const NavButton = (
		{
			href,
			children,
			className = "",
			margin = "2.5rem",
			...props
		}: PropsWithChildren<NavButton>) => (
		<Link
				href={href}
				className={`${styles.button} ${className}`}
				style={{marginBlock: margin}}
				{...props}
		>
			{children}
		</Link>
)

type Button = {
	className?: string
	margin?: string
}

export const Button = (
		{
			children,
			className = "",
			margin = "2.5rem",
			...props
		}: PropsWithChildren<Button>) => (
		<button
				className={`${styles.button} ${className}`}
				style={{marginBlock: margin}}
				{...props}
		>
			{children}
		</button>
)