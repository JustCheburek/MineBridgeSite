import type {ComponentPropsWithoutRef} from "react";
import styles from "./styles/form.module.scss"
import Link, {LinkProps} from "next/link";

export const Form = (
		{
			children,
			className = "",
			...props
		}: ComponentPropsWithoutRef<"form">
) => (
		<form
				className={`${styles.form} ${className}`}
				{...props}
		>
			{children}
		</form>
)

type FormButton = {
	danger?: boolean
}
export const FormButton = (
		{
			children,
			className = "",
			danger = false,
			...props
		}: FormButton & ComponentPropsWithoutRef<"button">
) => (
		<button
				className={`${styles.button} center_text ${danger ? styles.danger : ""} ${className}`}
				type="submit"
				{...props}
		>
			<strong>
				{children}
			</strong>
		</button>
)

export const FormLabel = (
		{
			children,
			className = "",
			...props
		}: ComponentPropsWithoutRef<"label">
) => (
		<label className={`${styles.label} ${className}`} {...props}>
			{children}
		</label>
)

export const FormGroup = (
		{
			children,
			className = "",
			...props
		}: ComponentPropsWithoutRef<"div">
) => (
		<div className={`${styles.group} ${className}`} {...props}>
			{children}
		</div>
)

export const FormInput = (
		{
			children,
			className = "",
			...props
		}: ComponentPropsWithoutRef<"input">
) => (
		<input className={`${styles.input} ${className}`} {...props}/>
)

export const FormTextarea = (
		{
			children,
			className = "",
			...props
		}: ComponentPropsWithoutRef<"textarea">
) => (
		<textarea className={`${styles.textarea} ${className}`} {...props}/>
)

export const FormSelect = (
		{
			children,
			className = "",
			...props
		}: ComponentPropsWithoutRef<"select">
) => (
		<select className={`${styles.select} ${className}`} {...props}>
			{children}
		</select>
)

export const Edit = ({...props}: LinkProps) => (
		<Link className="edit" {...props}>
			<svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="edit" viewBox="0 0 16 16">
				<path
						d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
				<path
						d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z"/>
			</svg>
		</Link>
)

export const Add = ({setModal}: { setModal?: (value: boolean) => void }) => (
		<button className="add" onClick={() => setModal && setModal(true)}>
			+
		</button>
)
