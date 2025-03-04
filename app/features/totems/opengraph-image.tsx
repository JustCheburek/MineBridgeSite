import {ImageResponse} from 'next/og'
import {OGImageBox} from "@components/ogimage";

export const runtime = 'edge'

export const size = {width: 1200, height: 630}

export default async function Image() {
    const MontserratMedium = await fetch(
        new URL('./Montserrat-Medium.ttf', process.env.NEXT_PUBLIC_GITHUB_URL!)
    ).then((res) => res.arrayBuffer())
    const MontserratBold = await fetch(
        new URL('./Montserrat-Bold.ttf', process.env.NEXT_PUBLIC_GITHUB_URL!)
    ).then((res) => res.arrayBuffer())

    return new ImageResponse(
        (
            <OGImageBox paths={["Фичи", "Тотемы"]}>
                Оставьте свой след в истории
            </OGImageBox>
        ),
        {
            ...size,
            fonts: [
                {
                    name: 'Montserrat',
                    data: MontserratBold,
                    style: 'normal',
                    weight: 700,
                }, {
                    name: 'Montserrat',
                    data: MontserratMedium,
                    style: 'normal',
                    weight: 500,
                },
            ]
        }
    )
}