import dynamic from 'next/dynamic'
import { revalidateTag } from 'next/cache'
import { validate } from '@services/user/validate'
import { getCase, getDropLocal, getDrops, getItem, getItems } from '@services/shop'
import { AddCasePurchase, GetCosmetic } from '@services/user/casePurchase'
import type { User } from 'lucia'
import type { Metadata } from 'next'
import type { CaseData } from '@/types/purchase'
import { Case, Drop, type RarityType, Item } from '@/types/case'
import { Img, ImgBox } from '@components/img'
import { Paths } from '@/const'
import { BG, Button, Url } from '@components/button'
import { StarSvg } from '@ui/SVGS'
import { H1 } from '@components/h1'
import { MaxSize } from '@components/maxSize'
import { cn } from '@/lib/utils'

const Avatar = dynamic(() => import('@components/avatar'))

declare module 'csstype' {
  interface Properties {
    '--_size'?: string
    '--_x'?: string
    '--_long'?: string
    '--_complete'?: string
    '--_angle'?: string
  }
}

export const metadata: Metadata = {
  title: 'Млечный путь',
  description: 'Набирая звёзды, можно получать разные крутые вещи бесплатно!',
}

const SIZE = 3.5
const CASE_ID = '662ddba08d5044c0b4ad7bf4'

interface Path {
  rating: number
  x: number
}

export interface PathID extends Path {
  caseData: {
    Item: string
    DropItem: string
    rarity: RarityType
    suffix?: string
  }
}

interface PathDB extends Path {
  caseData: CaseData
  author: User
  index: number
}

async function Path({ rating, author, x, caseData, index }: PathDB) {
  const { rarity, DropItem, Item, suffix } = caseData
  let long = 0
  let angle = 0
  let next = 0
  let difference = 0
  let complete = 0

  // Получение next и difference
  if (index < Paths.length - 1) {
    const nextPath = Paths[index + 1]
    next = nextPath.x
    difference = nextPath.rating - rating
  }

  // Права
  const isPerm = author.casesPurchases.some(casePurchase => {
    if (suffix) {
      return casePurchase.suffix === suffix
    }
    return casePurchase.Item.toString() === Item._id.toString()
  })

  const isHas = author.rating >= rating

  const height = (SIZE + 24.45) / 0.065
  const place1 = 8 * x + 740
  const place2 = 8 * next + 740
  const width = Math.abs(place2 - place1)

  // Последняя не создаёт линию
  const last = Paths[Paths.length - 1].rating
  if (last !== rating) {
    long = Math.sqrt(width ** 2 + height ** 2)
    angle = Math.atan2(height, width * (next > x ? 1 : -1))

    const have = author.rating - rating
    const percent = (difference - have) / difference
    // complete <= long
    complete = Math.min(long - long * percent, long)
  }

  const avatar = complete > 0 && complete < long

  return (
    <div
      className='contain-layout'
      style={{
        '--_x': `${x}rem`,
        '--_long': `${long}px`,
        '--_complete': `${complete}px`,
        '--_angle': `${angle}rad`,
      }}
    >
      <div className={cn('relative grid gap-10 justify-center items-center md:ml-[var(--_x)] max-md:flex-col')}>
        <div className='max-md:flex max-md:justify-center max-md:items-center max-md:flex-col max-md:mt-4 group/card'>
          {!suffix
            ? <ItemImg x={x} Item={Item} DropItem={DropItem} rarity={rarity} author={author} isPerm={isPerm} isHas={isHas} caseData={caseData} />
            : <Suffix suffix={suffix} DropItem={DropItem} rarity={rarity} author={author} isPerm={isPerm} isHas={isHas} caseData={caseData} />
          }
        </div>
        <div className='relative flex flex-col items-center gap-4'>
          <div className={cn(
            "size-(--_size) z-10 rounded-full shadow-[0_0_30px] max-md:hidden",
            isHas
              ? "bg-text shadow-text"
              : "bg-light-gray shadow-light-gray"
          )} />
          <h3 className='text-yellow flex justify-center items-center gap-[5px] text-shadow-[0_0_30px] text-shadow-yellow'>
            {rating} <StarSvg className='size-[0.9em]' />
          </h3>
          {difference > 0 && <>
            <div className={cn(
              'absolute w-(--_long) h-[3px] bg-light-gray max-md:hidden',
              'rotate-(--_angle) translate-y-[calc(var(--_size)/2)] translate-x-1/2 origin-left'
            )} />
            <div className={cn(
              'absolute w-(--_complete) h-[7px] bg-text rounded-base max-md:hidden',
              'rotate-(--_angle) translate-y-[calc(var(--_size)/2)] translate-x-1/2 origin-left'
            )} />
          </>}

          {avatar && (
            <div className={cn(
              'absolute size-[calc(var(--_size)-1rem)] z-20 bg-text rounded-full max-md:hidden',
              'flex justify-center items-center',
              'transform-[rotate(var(--_angle))_translate(var(--_complete))]'
            )}>
              <div
                className={cn(
                  'absolute flex gap-4 p-4 borderbox border-text box common -rotate-(--_angle)',
                  x >= 0
                  ? '-translate-x-15 -translate-y-22'
                  : '-translate-x-22 translate-y-15'
                )}
              >
                <Avatar src={author.photo} className='size-9' />
                <h3 className='text-yellow flex justify-center items-center gap-[5px] text-shadow-yellow text-shadow-[0_0_30px]'>
                  {author.rating} <StarSvg className='size-[0.9em]' />
                </h3>
              </div>
            </div>
          )}
        </div>

        {/* <p className='absolute top-0 right-0 z-50'>
          x: {x} <br />
          long: {long} <br />
          angle: {angle} <br />
          place1: {place1} <br />
          place2: {place2} <br />
          width: {width} <br />
          height: {height}
        </p> */}


      </div>
    </div>
  )
}

type Suffix = {
  suffix: string
  DropItem: Drop
  rarity: RarityType
} & GetButton
function Suffix({ suffix, DropItem, rarity, ...props }: Suffix) {
  return (
    <div className={cn('rounded-base bg-black grid place-items-center size-[18rem] [contain:strict] box', rarity)}>
      <div>
        <h2>{suffix}</h2>
        <p>{DropItem.description}</p>
      </div>
      <GetButton {...props} />
    </div>
  )
}

type ItemImg = {
  x: number
  Item: Item
  DropItem: Drop
  rarity: RarityType
} & GetButton
function ItemImg({ x, Item, DropItem, rarity, ...props }: ItemImg) {
  return (<>
    <ImgBox className={cn('rounded-base bg-black size-[18rem] [contain:strict] z-10 box', rarity)} hover>
      <Img
        src={`/shop/${DropItem.name}/${Item.name}.webp`}
        alt={Item.displayname || DropItem.name || ''}
        className='object-center object-cover contain-layout'
      />
    </ImgBox>

    {/* <div className={cn(
      'md:absolute top-1/2 md:-translate-y-1/2 grid items-center w-[70vw] h-64 p-4 md:p-10 overflow-hidden max-md:w-full max-md:h-auto',
      x <= 0
        ? 'left-0'
        : 'right-0'
    )}>
      <div className={cn(
        'md:absolute p-[0.8rem_2rem] border border-[#a6a6a6] bg-[#151b1e]',
        'transition-all duration-700 max-md:rounded-base',
        x <= 0
          ? 'right-[calc(70vw-19rem)] rounded-r-base md:hover:translate-x-[calc(100%-1rem)] md:group-has-[figure:hover]/card:translate-x-[calc(100%-1rem)]'
          : 'left-[calc(70vw-19rem)] rounded-l-base md:hover:translate-x-[calc(-100%+1rem)] md:group-has-[figure:hover]/card:translate-x-[calc(-100%+1rem)]'
      )}>
        <h2 className='w-max min-w-full'>{Item.displayname}</h2>
        <p>{DropItem.description}</p>
        <GetButton {...props} />
      </div>
    </div> */}
  </>)
}

type GetButton = {
  author: User
  isPerm: boolean
  isHas: boolean
  caseData: CaseData
}

function GetButton({ author, isPerm, isHas, caseData }: GetButton) {
  if (!isHas) {
    return (
      <Button className='my-[0.8rem] text-[#939393]' bg={false} disabled>
        <BG disabled className='border-1 border-[#767676] bg-[#263034] drop-shadow-[#263034]' />
        Получить
      </Button>
    )
  }

  if (isPerm) {
    return (
      <Button className='my-[0.8rem] text-[#939393]' bg={false} disabled>
        <BG disabled className='border-1 border-[#767676] bg-[#263034] drop-shadow-[#263034]' />
        Получено!
      </Button>
    )
  }

  return (
    <form
      action={async () => {
        'use server'
        await AddCasePurchase(author._id, caseData)
        await GetCosmetic(author.name, caseData)
      }}
    >
      <Button className='my-[0.8rem]'>Получить</Button>
    </form>
  )
}

type PathsLoader = {
  author: User
  Case: Case
  Drops: Drop[]
}
async function PathsLoader({ author, Case, Drops }: PathsLoader) {
  const pathComponents = await Promise.all(
    Paths.map(async ({ rating, x, caseData }, i) => {
      const DropItem = await getDropLocal({ _id: caseData.DropItem }, Drops)
      if (!DropItem) return null

      const Items = await getItems(caseData.rarity, DropItem)
      const Item = await getItem({ _id: caseData.Item }, Items)
      if (!Item) return null

      return (
        <Path
          key={i}
          rating={rating}
          author={author}
          x={x}
          caseData={{
            ...caseData,
            Case,
            Drop: DropItem,
            Item,
            DropItem,
          }}
          index={i}
        />
      )
    })
  )

  // Фильтруем null значения
  return pathComponents.filter(Boolean)
}

export default async function MilkyWay() {
  const [Case, Drops, { user: author }] = await Promise.all([
    getCase({ _id: CASE_ID }),
    getDrops(),
    validate(),
  ])

  if (!author) {
    return (
      <MaxSize className='text-center'>
        <H1>Млечный путь</H1>

        <Url href='/auth'>Войти в акк</Url>
      </MaxSize>
    )
  }

  return (
    <div
      className='bg-gradient-to-b from-background to-black text-center'
      style={{ '--_size': `${SIZE}rem` }}
    >
      <H1
        description='Боевой пропуск 7 сезона'
        reload={async () => {
          'use server'
          revalidateTag('all')
        }}
      >
        Млечный путь
      </H1>

      <div className='h-28 bg-gradient-to-b from-background to-black' />

      <div className='bg-black bg-[url(/milkyway/stars.svg)] bg-repeat bg-size-[500px] will-change-transform py-5'>
        <PathsLoader Drops={Drops} author={author} Case={Case} />
      </div>
    </div>
  )
}
