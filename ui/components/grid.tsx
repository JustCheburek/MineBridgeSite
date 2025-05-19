// React
import Link from "next/link";
import type {ComponentPropsWithoutRef, PropsWithChildren} from "react";

// Стили
import styles from "./styles/grid.module.scss";

// Компоненты
import {AnotherSiteSvg} from "@ui/SVGS";

declare module 'csstype' {
    interface Properties {
        '--_width'?: string
        '--_height'?: string
    }
}

type GContainer = {
    className?: string
    width?: number
    height?: number
    row?: number
    column?: number
    margin?: number
    border?: boolean
}

export const GContainer = (
    {
        children,
        className = "",
        width = 300,
        height = 250,
        row = 5,
        column = 2,
        margin = 3,
        border = false,
        ...props
    }: PropsWithChildren<GContainer>) => (
    <div
        className={`${styles.container} ${border ? styles.box_border : ""} ${className}`}
        style={{
            '--_width': `${width}px`,
            '--_height': `${height}px`,
            rowGap: `${row}rem`,
            columnGap: `${column}rem`,
            marginBlock: `${margin}rem`
        }}
        {...props}
    >
        {children}
    </div>
)

type GBox = {
    className?: string
    href?: string
    anotherSite?: boolean
    imgs?: "one" | "two" | "three"
    target?: string
    id?: string
}

export const GBox = (
    {
        children,
        href = "",
        anotherSite = false,
        imgs,
        target = "_self",
        className = "",
        id
    }: PropsWithChildren<GBox>) => {
    const classNameResult = `${styles.box} ${imgs ? styles[imgs] : ""} ${className}`

    if (!href) {
        return (
            <div className={classNameResult} id={id}>
                {children}
                {anotherSite &&
                  <AnotherSiteSvg className={styles.link}/>
                }
            </div>
        )
    }

    if (href.toString().startsWith("http")) {
        target = "_blank"
    }

    return (
        <Link
            href={href}
            className={classNameResult}
            target={target}
            id={id}
        >
            {children}
            {anotherSite &&
              <AnotherSiteSvg className={styles.link}/>
            }
        </Link>
    )
}

type GText = {
    center?: boolean
} & ComponentPropsWithoutRef<"h3">
export const GText = ({children, center=false, className, ...props}: GText) => (
    <h3 className={`${styles.text} center_text ${center ? styles.center : ""} ${className}`} {...props}>
        {children}
    </h3>
)

/*
export const GHint = ({children, className, ...props}: ComponentPropsWithoutRef<"h4">) => (
    <h4 className={`${styles.hint} ${className}`} {...props}>
        <strong>
            {children}
        </strong>
    </h4>
)*/
