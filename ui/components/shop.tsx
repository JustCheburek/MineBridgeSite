import type {ComponentPropsWithoutRef, PropsWithChildren} from "react";
import Link from "next/link";
import {MostikiSvg} from "@ui/SVGS";
import styles from "./styles/shop.module.scss";

export const Section = ({children, type}: PropsWithChildren<{ type?: "preview" | "third" }>) => (
    <div className={`${styles.container} center_text ${type && styles[type]}`}>
        {children}
    </div>
)

type Heading = ComponentPropsWithoutRef<"div">
export const Heading = ({children, className, ...props}: Heading) => (
    <div className={`grid_center ${styles.heading} ${className}`} {...props}>
        {children}
    </div>
)

type Author = {
    description: string;
    href: string;
}

export const Author = ({description, href, children}: PropsWithChildren<Author>) => (
    <div className={`${styles.heading} center_text`}>
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

export const Box = ({children, preview = false, ...props}: PropsWithChildren<{ preview?: boolean }>) => (
    <div className={`${styles.box} ${preview ? styles.preview : ""}`} {...props}>
        {children}
    </div>
)

export const Text = ({children}: PropsWithChildren) => (
    <div className={styles.text}>
        {children}
    </div>
)

export const Price = ({children, oldPrice}: PropsWithChildren<{ oldPrice?: number }>) => (
    <div className={styles.price}>
        {oldPrice &&
          <p className={`${styles.old_price} medium-font`}>
              {oldPrice}
          </p>
        }

        <h2 className={styles.price_text}>{children}</h2>

        <h3 className={styles.price_type}>
            <MostikiSvg/>
        </h3>
    </div>
)