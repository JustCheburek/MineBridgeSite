import { ImageResponse } from 'next/og'
import { OGImageBox } from '@components/ogimage'
import { NameParams } from '@/types/params'

export const runtime = 'edge'

export const size = { width: 1200, height: 630 }

// todo: Добавить аватарку игрока

export default async function Image({ params }: NameParams) {
  const { name } = await params

  const MontserratMedium = await fetch(
    new URL('./Montserrat-Medium.ttf', process.env.NEXT_PUBLIC_GITHUB_URL!)
  ).then(res => res.arrayBuffer())
  const MontserratBold = await fetch(
    new URL('./Montserrat-Bold.ttf', process.env.NEXT_PUBLIC_GITHUB_URL!)
  ).then(res => res.arrayBuffer())

  return new ImageResponse(
    <OGImageBox paths={[name]}>{name} играет на Майнбридж, а ты?)</OGImageBox>,
    {
      ...size,
      fonts: [
        {
          name: 'Montserrat',
          data: MontserratBold,
          style: 'normal',
          weight: 700,
        },
        {
          name: 'Montserrat',
          data: MontserratMedium,
          style: 'normal',
          weight: 500,
        },
      ],
    }
  )
}
