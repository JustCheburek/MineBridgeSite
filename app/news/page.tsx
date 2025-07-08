import type { Metadata } from 'next'
import { revalidateTag } from 'next/cache'
import { H1 } from '@components/h1'
import { PBox, PTag, PTags, PText, PTitle, SeasonBox } from '@components/post'
import { NewsInfiniteList } from './components'
import { getSeasons } from '@/services/seasons'
import { Suspense } from 'react'
import { Skeleton } from '@components/skeleton'
import { Img, ImgBox } from '@components/img'
import { CheckLink } from '@/ui/components/checkLink'
import Link from 'next/link'
import { TG_URL } from '@/const'

export const revalidate = 3600

export const metadata: Metadata = {
  title: 'Новости',
  description: 'Важнейшие новости, избираемые из телеграма майнбриджа. Здесь интересно!',
}

// todo: деление на сезоны
export default async function News() {
  const seasons = await getSeasons()

  return (
    <div className='news_content'>
      <H1
        up
        reload={async () => {
          'use server'
          revalidateTag('all')
        }}
      >
        Новости
      </H1>

      <PBox>
        <Link href={TG_URL}>
            <ImgBox type="post">
              <Img src='/news/tg.jpg' alt='Новости' />
            </ImgBox>
          </Link>
        <PTitle>
          <h3>🌶 Новости сервера 🌶</h3>
        </PTitle>
        <PText className="whitespace-pre-line [&_*]:leading-[1.7em] [&>p]:my-0.5 [&>.blockquote]:my-0.5">
          <p>
            Следить за новостями можно в нашем <Link href={TG_URL} className='text-unic font-bold'>телеграм-канале</Link> 📲
          </p>
          <p>
            Подписывайся, чтобы не пропустить <Link href={TG_URL} className='text-unic font-bold'>важные новости</Link> 💬
          </p>
        </PText>
      </PBox>

      {/* {seasons.map(season =>
                <div key={season.number}>
                    <SeasonBox
                        number={season.number}
                        startAt={new Date(season.startAt)}
                        endAt={new Date(season.endAt)}
                    />
                </div>
            )} */}

      <Suspense fallback={<Skeleton className='h-[400px] w-[100%]' />}>
        <NewsInfiniteList />
      </Suspense>
    </div>
  )
}
