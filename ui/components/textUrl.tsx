import type {PropsWithChildren} from "react";
import Link, {type LinkProps} from "next/link";
import styles from "./styles/textUrl.module.scss"
import {AutoSvg} from "@ui/SVGS";

export function TextUrl({href, children, ...props}: PropsWithChildren<LinkProps>) {
    const type = href?.toString()
        ?.split("/")[2]
        ?.split(".")[0]

    return (
        <Link
            href={href}
            target="_blank"
            className={`${styles.url} ${styles[type]}`}
            {...props}
        >
            <AutoSvg type={type} size="1.2em" className="color"/>
            {children}
        </Link>
    )
}