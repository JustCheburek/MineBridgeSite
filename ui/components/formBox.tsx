import {ComponentPropsWithoutRef, PropsWithChildren} from "react";
import {setModal} from "@components/modal";
import styles from "./styles/form.module.scss"
import Link, {LinkProps} from "next/link";
import Form, {FormProps} from "next/form";

interface DangerProps {
    danger?: boolean
}

export const FormBox = (
    {
        children,
        className = "",
        margin = "20px",
        ...props
    }: FormProps & {margin?: string | number}
) => (
    <Form
        className={`${styles.form} ${className}`}
        style={{marginBlock: margin}}
        {...props}
    >
        {children}
    </Form>
)

export const DefaultFormBox = (
    {
        children,
        className = "",
        margin = "20px",
        ...props
    }: ComponentPropsWithoutRef<"form"> & {margin?: string | number}
) => (
    <form
        className={`${styles.form} ${className}`}
        style={{marginBlock: margin}}
        {...props}
    >
        {children}
    </form>
)

interface FormButton extends ComponentPropsWithoutRef<"button">, DangerProps {
}

export const FormButton = (
    {
        children,
        className = "",
        danger = false,
        ...props
    }: FormButton
) => (
    <button
        className={`${styles.button} center_text ${danger ? styles.danger : ""}`}
        type="submit"
        {...props}
    >
        <strong className={className}>
            {children}
        </strong>
    </button>
)

interface FormLink extends DangerProps, PropsWithChildren, LinkProps {
    className?: string
    download?: boolean
    target?: string
}

export const FormLink = (
    {
        href,
        children,
        target,
        className = "",
        download = false,
        danger = false,
        ...props
    }: FormLink
) => {
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
            className={`${styles.button} center_text ${danger ? styles.danger : ""} ${className}`}
            download={download}
            {...props}
        >
            <strong>
                {children}
            </strong>
        </Link>
    )
}

export const FormLabel = (
    {
        children,
        className = "",
        ...props
    }: ComponentPropsWithoutRef<"label">
) => (
    <label className={`${styles.label} ${className} no_select flex_center`} {...props}>
        {children}
    </label>
)

export interface FormGroupProps extends ComponentPropsWithoutRef<"div"> {
}

export const FormGroup = (
    {
        children,
        className = "",
        ...props
    }: FormGroupProps
) => (
    <div className={`${styles.group} ${className}`} {...props}>
        {children}
    </div>
)

export interface FormInputProps extends ComponentPropsWithoutRef<"input">, DangerProps {
}

export const FormInput = (
    {
        children,
        className = "",
        danger = false,
        ...props
    }: FormInputProps
) => (
    <input
        className={`${styles.input} ${danger ? styles.danger : ""} ${className}`}
        {...props}
    />
)

export interface FormTextareaProps extends ComponentPropsWithoutRef<"textarea"> {
}

export const FormTextarea = (
    {
        children,
        className = "",
        ...props
    }: FormTextareaProps
) => (
    <textarea className={`${styles.textarea} ${className}`} {...props}/>
)

export interface FormSelectProps extends ComponentPropsWithoutRef<"select"> {
}

export const FormSelect = (
    {
        children,
        className = "",
        ...props
    }: FormSelectProps
) => (
    <select className={`${styles.select} ${className}`} {...props}>
        {children}
    </select>
)

export interface EditProps extends ComponentPropsWithoutRef<"button"> {
    setModal: setModal
}

export const Edit = ({className = "", setModal, ...props}: EditProps) => (
    <button className={`${styles.edit} ${className}`} onClick={() => setModal(true)} {...props}>
        <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="edit" viewBox="0 0 16 16">
            <path
                d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
            <path
                d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z"/>
        </svg>
    </button>
)

export interface AddProps extends ComponentPropsWithoutRef<"button"> {
    setModal: setModal
}

export const Add = ({className = "", setModal, ...props}: AddProps) => (
    <button className={`${styles.add} ${className}`} onClick={() => setModal(true)} {...props}>
        +
    </button>
)