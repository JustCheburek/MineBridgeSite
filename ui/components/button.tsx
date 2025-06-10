// React
import type { ComponentPropsWithoutRef } from "react";
import Link, { LinkProps } from "next/link";

// Стили
import styles from "./styles/button.module.scss"
import { DangerProps } from "@components/form";
import { HorizontalLoadingSvg } from "@ui/SVGS"

type Url = {
    margin?: string | number
} & ComponentPropsWithoutRef<"a"> & LinkProps & DangerProps

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
    }: Url) => {

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
            style={{ marginBlock: margin }}
            download={download}
            {...props}
        >
            {children}
        </Link>
    )
}

export type ButtonProps = {
    margin?: string
} & ComponentPropsWithoutRef<"button"> & DangerProps

export const Button = (
    {
        children,
        className = "",
        margin = "2.5rem",
        danger = false,
        ...props
    }: ButtonProps) => {
    return (
        <button
            className={`${styles.button} ${className} ${danger ? styles.danger : ""}`}
            style={{ marginBlock: margin }}
            {...props}
        >
            {children}
        </button>
    )
}