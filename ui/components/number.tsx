"use client";

import styles from "./styles/number.module.scss";
import {LinkSvg} from "@ui/SVGS";
import {ComponentPropsWithoutRef, PropsWithChildren} from "react";
import Link, {type LinkProps} from "next/link";
import {usePathname} from "next/navigation";

type LinkNumberProps = {
    box?: boolean
} & PropsWithChildren & LinkProps
export const LinkNumber = ({href, box = true, children, ...props}: LinkNumberProps) => {
    const path = usePathname()
    const url = new URL(`${path}#${href}`, process.env.NEXT_PUBLIC_EN_URL!).toString()

    return (
        <Link
            href={`#${href}`} className={`${styles.number} ${box ? styles.box : styles.empty}`}
            onClick={() => navigator.clipboard.writeText(url)}
            {...props}
        >
            <LinkSvg className={styles.link}/>
            <p className={`${styles.text} center_text ${box ? "medium-font" : ""}`}>{children}</p>
        </Link>
    )
}

type NumberProps = {
    box?: boolean
    removeM?: boolean
} & ComponentPropsWithoutRef<"span">
export const Number = ({children, className, box = true, removeM = true, ...props}: NumberProps) => (
    <span
        className={`${styles.number} ${removeM ? styles.removeM : ""} ${box ? styles.box : styles.empty}`}
        {...props}
    >
        {children}
    </span>
)

export const SNumber = ({children, ...props}: ComponentPropsWithoutRef<"span">) => (
    <span
        className={`${styles.simple_number} ${styles.box}`}
        {...props}
    >
        {children}
    </span>
)