// React
import type {PropsWithChildren} from "react";

// Стили
import styles from "./styles/post.module.scss";

type PContainer = {
	className?: string
	createdAt?: Date
	updatedAt?: Date
}

export const PBox = (
		{
			children,
			className = "",
			createdAt,
			updatedAt
		}: PropsWithChildren<PContainer>
) => (
		<div
				className={`${styles.container} ${className}`}
		>
			{children}
		</div>
)

export const PTitle = (
		{
			children, className = ""
		}: PropsWithChildren<{
			className?: string
		}>) => (
		<div className={`${styles.title} ${className}`}>
			{children}
		</div>
)

export const PText = (
		{
			children, className = ""
		}: PropsWithChildren<{
			className?: string
		}>) => (
		<div className={`${styles.text} ${className}`}>
			{children}
		</div>
)