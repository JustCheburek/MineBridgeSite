import {ImageResponse} from 'next/og'
import {OGImageBox} from "@components/ogimage";
import {getUsers} from "@/services";

export const alt = 'Майнбридж'
export const size = {width: 1200, height: 600}
export const contentType = 'image/png'

export default async function Image() {
    const MontserratMedium = await fetch(
        new URL('./Montserrat-Medium.ttf', process.env.NEXT_PUBLIC_RU_URL!)
    ).then((res) => res.arrayBuffer())
    const MontserratBold = await fetch(
        new URL('./Montserrat-Bold.ttf', process.env.NEXT_PUBLIC_RU_URL!)
    ).then((res) => res.arrayBuffer())
    const usersL = (await getUsers()).length

    return new ImageResponse(
        (
            <OGImageBox paths={["Игроки"]}>
                Братья и сестры всея Майнбридж! Игроков всего-то {usersL}...
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