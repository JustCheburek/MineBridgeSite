import type { ComponentPropsWithoutRef, PropsWithChildren } from "react";
import Link from "next/link";
import { MostikiSvg } from "@ui/SVGS";
import styles from "./styles/shop.module.scss";

type Section = { type?: "preview" | "third" } & ComponentPropsWithoutRef<"div">
export const Section = ({ children, type, ...props }: Section) => (
    <div className={`${styles.container} center_text ${type && styles[type]}`} {...props}>
        {children}
    </div>
)

type Heading = ComponentPropsWithoutRef<"div">
export const Heading = ({ children, className, ...props }: Heading) => (
    <div className={`grid_center ${styles.heading} ${className}`} {...props}>
        {children}
    </div>
)

type Author = {
    description: string;
    href: string;
} & ComponentPropsWithoutRef<"div">
export const Author = ({ description, href, children, ...props }: Author) => (
    <div className={`${styles.heading} center_text`} {...props}>
        <Link href={href} target="_blank">
            <h3>
                {children}
            </h3>
            <small>
                {description}
            </small>
        </Link>
    </div>
)

type Box = ComponentPropsWithoutRef<"div"> & { preview?: boolean }
export const Box = ({ children, preview = false, className = "", ...props }: Box) => (
    <div className={`${styles.box} ${preview ? styles.preview : ""} ${className}`} {...props}>
        {children}
    </div>
)

type Text = ComponentPropsWithoutRef<"div">
export const Text = ({ children, className = "", ...props }: Text) => (
    <div className={`${styles.text} ${className}`} {...props}>
        {children}
    </div>
)

export const Price = ({ children, oldPrice }: PropsWithChildren<{ oldPrice?: number }>) => (
    <div className={styles.price}>
        {oldPrice &&
            <p className={`${styles.old_price} medium-font`}>
                {oldPrice}
            </p>
        }

        <h2 className={styles.price_text}>{children}</h2>

        <h3 className={styles.price_type}>
            <MostikiSvg />
        </h3>
    </div>
)