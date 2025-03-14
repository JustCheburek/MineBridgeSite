"use client";

import styles from "./styles/number.module.scss";
import {LinkSvg} from "@ui/SVGS";
import {ComponentPropsWithoutRef, PropsWithChildren} from "react";
import Link, {LinkProps} from "next/link";

type LinkNumberProps = {
    path?: string
    box?: boolean
} & PropsWithChildren & LinkProps
export const LinkNumber = ({children, href, path = `rules`, box = true, ...props}: LinkNumberProps) => (
    <Link
        href={`#${href}`} className={`${styles.number} ${box ? styles.box : styles.empty}`}
        onClick={() => navigator.clipboard.writeText(new URL(`${path}#${href}`, process.env.NEXT_PUBLIC_EN_URL!).toString())}
        {...props}
    >
        <LinkSvg className={styles.link}/>
        <p className={`${styles.text} center_text ${box ? "medium-font" : ""}`}>{children}</p>
    </Link>
)

type NumberProps = {
    box?: boolean
} & ComponentPropsWithoutRef<"span">
export const Number = ({children, className, box = true, ...props}: NumberProps) => (
    <span
        className={`${styles.number} ${box ? styles.box : styles.empty}`}
        {...props}
    >
        {children}
    </span>
)