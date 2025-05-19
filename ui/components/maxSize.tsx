// React
import type {ComponentPropsWithoutRef} from "react";

// Стили
import styles from "./styles/maxSize.module.scss";

declare module 'csstype' {
    interface Properties {
        '--max-width'?: string
    }
}

type MaxSize = {
    width?: number
    sideNav?: boolean
}

export function MaxSize(
    {
        children,
        sideNav = false,
        className = "",
        width = 1200,
        ...props
    }: ComponentPropsWithoutRef<"div"> & MaxSize) {
    if (sideNav && width === 1200) {
        width = 1300
    }

    return (
        <div className={`${styles.max_size} ${sideNav ? styles.sideNav : ""} ${className}`}
             style={{"--max-width": `${width}px`}} {...props}>
            {children}
        </div>
    )
}