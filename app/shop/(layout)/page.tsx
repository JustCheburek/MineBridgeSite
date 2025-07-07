import type { Metadata } from 'next'
import Link from 'next/link'
import { getCases, getDrops } from '@services/shop'
import { Author, Box, Heading, Price, Section, Text } from '@components/shop'
import { CaseBoxWithModal } from '@components/caseBoxModal'
import { MostikiSvg } from '@ui/SVGS'
import { Url } from '@components/button'
import { Img, ImgBox } from '@components/img'
import { OnThisPage, OnThisPageLink } from '@components/sideNav'
import { H1 } from '@components/h1'
import { Suspense } from 'react'
import { Skeleton } from '@components/skeleton'
import { revalidateTag } from 'next/cache'
import { LASTSHOPUPDATE } from '@/const'
import { LastUpdate } from '@components/lastUpdate'
import { TextUrl } from '@components/textUrl'
import { PreSeason } from './preseason'
import { validate } from '@/services/user/validate'
import { StarSlider } from './starslider'

export const metadata: Metadata = {
  title: 'Магазин',
  description: 'Мостики — внутриигровая валюта. 1 ₽ = 1 мостик. Кейсы, стикеры, всё это про нас!',
}

const CaseButton = () => (
  <Url href='/shop/case' className='my-[10px]'>
    Купить
  </Url>
)

const MostikiButton = ({ mostiki = 1 }: { mostiki?: number }) => (
  <Url href={`/shop/buy?mostiki=${mostiki}`} className='my-[10px]'>
    Купить
  </Url>
)

export default async function Shop() {
  const { user: author } = await validate()
  const [Cases, Drops] = await Promise.all([getCases(), getDrops()])

  // todo: киты в дуэлях
  return (
    <>
      <div>
        <H1
          up
          reload={async () => {
            'use server'
            revalidateTag('all')
          }}
        >
          Магазин
        </H1>

        <div className='grid place-items-center' id='mostiki'>
          <LastUpdate time={LASTSHOPUPDATE} />
          <div className='flex flex-wrap items-end gap-2'>
            <p>
              Донатная валюта — <strong className='text-unic'>мостики</strong>:
            </p>
            <h3 className='text-center'>
              1 ₽ = 1 <MostikiSvg />
            </h3>
          </div>

          <Url href='/shop/buy' className='mx-[2rem]'>
            Купить
          </Url>
        </div>

        <Heading id='preseason' className='text-center'>
          <h2>Межсезонье</h2>
          <p>Проходки на межсезонье</p>
        </Heading>

        <PreSeason author={author} />

        <Heading id='cases'>
          <h2 className='text-center'>
            <Link href='/shop/case'>Кейсы</Link>
          </h2>
          <p>
            С помощью кейсов можно
            <br />
            кастомизировать свой внешний вид
          </p>
        </Heading>

        <Section>
          <Suspense fallback={<Skeleton className='h-[440px] w-[100%]' />}>
            {Cases.map((Case, index) => (
              <Box key={Case.name} casebox={index === 2}>
                <CaseBoxWithModal Case={Case} Drops={Drops} />
                <Text>
                  <h3>{Case.displayname}</h3>
                  <Price oldPrice={Case.oldPrice}>{Case.price}</Price>
                  <CaseButton />
                </Text>
              </Box>
            ))}
          </Suspense>
        </Section>

        <Heading id='stickers'>
          <h2 className='text-center'>
            <Link href='/features/stickers'>Стикеры</Link>
          </h2>
          <p>
            Показывайте свой скин, пожелания и идеи,
            <br />
            чтобы телеграм стикер ещё уникальнее
            <br />
            <TextUrl href='https://discord.gg/7zx8u4rY'>#покупка</TextUrl>{' '}
            <TextUrl href='https://t.me/JustCheburek'>JustCheburek</TextUrl>{' '}
            <TextUrl href='https://t.me/Dezelink'>Dezelink</TextUrl>
          </p>
        </Heading>

        <Author description='Художник-приколист' href='https://t.me/coolpilot2O1O'>
          @coolpilot2O1O
        </Author>

        <Section>
          <Box preview>
            <Link href='/features/stickers'>
              <ImgBox hover helper>
                <Img src='/features/stickers/4.png' alt='Стикер' width={225} />
              </ImgBox>
            </Link>
          </Box>

          <Box>
            <Text>
              <h3>Стандарт</h3>
              <small>Обычный стикер</small>
              <Price>200</Price>
              <MostikiButton mostiki={200} />
            </Text>
          </Box>

          <Box>
            <Text>
              <h3>Экспресс</h3>
              <small>Невероятно быстро</small>
              <Price>300</Price>
              <MostikiButton mostiki={300} />
            </Text>
          </Box>
        </Section>

        <Author description='Абстрактный художник' href='https://t.me/Dezelink'>
          @Dezelink
        </Author>

        <Section>
          <Box preview>
            <Link href='/features/stickers'>
              <ImgBox hover helper>
                <Img src='/features/stickers/14.png' alt='Стикер' width={225} />
              </ImgBox>
            </Link>
          </Box>

          <Box>
            <Text>
              <h3>Необычные</h3>
              <small>Абстрактные стикеры</small>
              <Price>400</Price>
              <MostikiButton mostiki={400} />
            </Text>
          </Box>

          <Box>
            <Text>
              <h3>Speed UP</h3>
              <small>А где очередь?</small>
              <Price>500</Price>
              <MostikiButton mostiki={500} />
            </Text>
          </Box>
        </Section>

        <Heading id='pass'>
          <h2 className='text-center'>Проходки</h2>
          <p>
            Валюта скидок — <strong className='text-unic'>погасшие звёзды</strong>
            <br />
          </p>
        </Heading>

        <StarSlider max={author?.faded_rating ?? 0} />
        <Section>
          <Box>
            {/* <ImgBox hover>
                        <Img
                            src={`/shop/month.png`} alt={`Месяц`}
                            width={185}
                        />
                    </ImgBox> */}
            <Text>
              <h3>1 месяц</h3>
              <Price>?</Price>
              <MostikiButton />
            </Text>
          </Box>
          <Box>
            {/* <ImgBox hover>
                        <Img
                            src={`/shop/3months.png`} alt={`3 месяца`}
                            width={185}
                        />
                    </ImgBox> */}
            <Text>
              <h3>3 месяца</h3>
              <Price>?</Price>
              <MostikiButton />
            </Text>
          </Box>
          <Box span2>
            {/* <ImgBox hover>
                        <Img
                            src={`/shop/legendary.png`} alt={`Год`}
                            width={185}
                        />
                    </ImgBox> */}
            <Text>
              <h3>12 месяцев</h3>
              <Price>?</Price>
              <MostikiButton />
            </Text>
          </Box>
        </Section>

        {/*<Heading id="kits">
                <h2 className="text-center">
                    Киты
                </h2>
                <p>
                    Для разнообразной игры в дуэлях
                </p>
                <h4 className="text-center">
                    В разработке
                </h4>
            </Heading>*/}
      </div>

      <OnThisPage>
        <OnThisPageLink href='#mostiki'>Мостики</OnThisPageLink>
        <OnThisPageLink href='#preseason'>Межсезонье</OnThisPageLink>
        <OnThisPageLink href='#cases'>Кейсы</OnThisPageLink>
        <OnThisPageLink href='#stickers'>Стикеры</OnThisPageLink>
        <OnThisPageLink href='#pass'>Проходки</OnThisPageLink>
        {/*<OnThisPageLink href="#kits">
                Киты
            </OnThisPageLink>*/}
      </OnThisPage>
    </>
  )
}
