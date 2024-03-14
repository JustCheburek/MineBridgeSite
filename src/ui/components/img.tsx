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
	height?: string,
	hover?: boolean
}

export const ImgBox = (
		{
			className, type, children, background, width, height, hover=false, style, ...props
		}: ComponentPropsWithoutRef<"figure"> & ImgBox,
) => {
	let backgroundStyle, hoverStyle

	if (background) {
		backgroundStyle = {backgroundImage: `url(${background})`}
	}

	if (type === "post") {
		hover = true
	}

	if (hover) {
		hoverStyle = {"--_hover": 1.1}
	}

	return (
			<figure
					className={`${styles.box} ${!!type ? styles[type] : ""} ${className}`}
					style={{...hoverStyle, ...backgroundStyle, width, height, ...style}}
					{...props}
			>
				{children}
			</figure>
	)
}

export const Img = (
		{
			src, alt,
			className,
			pixel = false,
			...props
		}: { pixel?: boolean } & ImageProps
) => {
	if (!props.width && !props.height) {
		props.fill = true
	}
	if (props.width && !props.height) {
		props.height = props.width
	}

	return (
			<Image
					className={`${styles.img} ${className} ${pixel ? styles.pixel : ""}`}
					src={src} alt={alt}
					loading="lazy" {...props}
			/>
	)
}