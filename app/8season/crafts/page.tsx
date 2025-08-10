import { MaxSize } from '@components/maxSize'
import { H1 } from '@components/h1'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Секретные лорные крафты',
  description: 'Лоооор! 8 сезон!',
  robots: {
    index: false
  }
}

export default function SecretCrafts() {
  return (
    <MaxSize>
      <H1>Крафты</H1>

      {/* <iframe
        src='https://www.youtube.com/embed/XavIL238_FA?si=MfqXr_2tr3vKi3gK'
        frameBorder='0'
        allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share'
        referrerPolicy='strict-origin-when-cross-origin'
        allowFullScreen
      /> */}
    </MaxSize>
  )
}
