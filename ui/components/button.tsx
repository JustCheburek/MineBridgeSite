// React
import type {ComponentPropsWithoutRef} from "react";
import Link, {LinkProps} from "next/link";

// Стили
import styles from "./styles/button.module.scss"
import {DangerProps} from "@components/formBox";

type Url = {
    margin?: string | number
}

export const Url = (
    {
        href,
        children,
        target,
        className = "",
        margin = "2.5rem",
        download = false,
        danger = false,
        ...props
    }: ComponentPropsWithoutRef<"a"> & LinkProps & Url & DangerProps) => {

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
            className={`${styles.button} ${className} ${danger ? styles.danger : ""}`}
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
        danger = false,
        ...props
    }: ComponentPropsWithoutRef<"button"> & Button & DangerProps) => (
    <button
        className={`${styles.button} ${className} ${danger ? styles.danger : ""}`}
        style={{marginBlock: margin}}
        {...props}
    >
        {children}
    </button>
)