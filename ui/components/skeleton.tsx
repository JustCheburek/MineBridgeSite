import styles from "./styles/skeleton.module.scss"

type Width = number | string
type Height = number | string
type OnlyWidth = {
    width: Width
    height?: Height
}
type OnlyHeight = {
    width?: Width
    height: Height
}
type WidthAndHeight = Required<OnlyWidth & OnlyHeight>
type Size = OnlyWidth | OnlyHeight | WidthAndHeight

export function Skeleton({width, height}: Size) {
    if (!width) width = height
    if (!height) height = width

    return (
        <div
            className={styles.box}
            style={{
                width: typeof width === "number" ? `${width}px` : width,
                height: typeof height === "number" ? `${height}px` : height
            }}
        />
    )
}