import { ImageResponse } from 'next/og'
import styles from './op-image.module.scss'

export const runtime = 'edge'

// Image metadata
export const alt = 'About Acme'
export const size = {
    width: 1920,
    height: 1080,
}

export const contentType = 'image/png'

export default async function Image() {
    const Montserrat = await fetch(
        new URL('./Montserrat-Bold.ttf', import.meta.url)
    ).then((res) => res.arrayBuffer())

    return new ImageResponse(
        (
            // ImageResponse JSX element
            <div
                className={styles.image}
            >
                MineBridge
            </div>
        ),
        // ImageResponse options
        {
            // For convenience, we can re-use the exported opengraph-image
            // size config to also set the ImageResponse's width and height.
            ...size,
            fonts: [
                {
                    name: 'Montserrat',
                    data: Montserrat,
                    style: 'normal',
                    weight: 400,
                },
            ],
        }
    )
}