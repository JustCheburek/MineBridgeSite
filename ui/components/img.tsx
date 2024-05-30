// React
import type {ImageProps} from "next/image";
import Image from "next/image";
import type {ComponentPropsWithoutRef} from "react";

// Стили
import styles from "./styles/img.module.scss"

type ImgBox = {
    className?: string
    type?: "post" | "grid" | undefined
    background?: string
    width?: string
    height?: string
    hover?: boolean
    overflow?: boolean
    borderRadius?: boolean
}

export const ImgBox = (
    {
        className = "",
        type,
        children,
        background,
        width,
        height,
        overflow = true,
        hover = false,
        borderRadius = false,
        style,
        ...props
    }: ComponentPropsWithoutRef<"figure"> & ImgBox,
) => {
    let backgroundStyle, overflowStyle

    if (background) {
        backgroundStyle = {backgroundImage: `url(${background})`}
    }

    if (overflow) {
        overflowStyle = {overflow: "hidden"}
    }

    if (type === "post") {
        hover = true
    }

    return (
        <figure
            className={`${styles.box} ${!!type ? styles[type] : ""} ${hover ? styles.hover : ""} ${borderRadius ? "border-radius" : ""} ${className}`}
            style={{...backgroundStyle, ...overflowStyle, width, height, ...style}}
            {...props}
        >
            {children}
        </figure>
    )
}

export const Img = (
    {
        src, alt,
        className = "",
        pixel = false,
        symmetrical = true,
        ...props
    }: { pixel?: boolean, symmetrical?: boolean } & ImageProps
) => {
    if (!props.width && !props.height) {
        props.fill = true
        props.sizes = "50vw"
    }

    if (symmetrical) {
        if (!props.height) props.height = props.width
        if (!props.width) props.width = props.height
    }

    return (
        <Image
            className={`${styles.img} ${pixel ? "pixel" : ""} ${className}`}
            src={src} alt={alt}
            loading="lazy" {...props}
        />
    )
}

export const Totem = (
    {
        src, alt,
        className = "",
        ...props
    }: ComponentPropsWithoutRef<"img">
) => {
    return (
        <img src={src} alt={alt} width={160} className={`${styles.img} pixel ${className}`} {...props}/>
    )
}