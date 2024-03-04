// React
import type {ComponentPropsWithoutRef, PropsWithChildren} from "react";
import Link, {LinkProps} from "next/link";

// Стили
import styles from "./styles/button.module.scss"

type Url = {
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
		}: ComponentPropsWithoutRef<"a"> & Url) => (
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
		}: PropsWithChildren<NavButton> & LinkProps) => (
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