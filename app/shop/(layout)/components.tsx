import type {ComponentPropsWithoutRef, PropsWithChildren} from "react";
import styles from "./shop.module.scss";
import Link from "next/link";
import {MostikiSvg} from "@ui/SVGS";
import {Url} from "@components/button";

export const Section = ({children, name}: PropsWithChildren<{ name: string }>) => (
    <div className={`${styles.container} center_text ${styles[name]}`}>
        {children}
    </div>
)

type Heading = ComponentPropsWithoutRef<"div">
export const Heading = ({children, className, ...props}: Heading) => (
    <div className={`grid_center ${styles.section_heading} ${className}`} {...props}>
        {children}
    </div>
)

type Author = {
    description: string;
    href: string;
}

export const Author = ({description, href, children}: PropsWithChildren<Author>) => (
    <div className={`${styles.author_heading} center_text`}>
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

export const CaseButton = () => (
    <Url href="/shop/case" margin="10px">
        Купить
    </Url>
)

export const StickerButton = () => (
    <Url href="https://t.me/MineBridgeOfficial/326" margin="10px">
        Купить
    </Url>
)

export const HideMeButton = () => (
    <Url href="https://discord.gg/7zx8u4rY" margin="10px">
        Купить
    </Url>
)