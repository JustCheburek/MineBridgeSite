import type { Metadata } from 'next'
import { getAllCasesPurchases, getCases, getDrops } from '@services/shop'
import { validate } from '@services/user/validate'
import { Info } from '@/types/case'
import { revalidateTag } from 'next/cache'
import { Case } from '@/types/case'
import { Drop } from '@/types/case'
import { CaseClient } from './caseClient'
import { GetCosmetic } from '@services/user/cosmetics/get'
import { AddCasePurchase } from '@services/user/payments/case/add'
import { H1 } from '@components/h1'
import { cn } from '@/lib/utils'
import { MaxSize } from '@components/maxSize'
import { GBox, GContainer } from '@components/grid'
import TimeAgo from 'javascript-time-ago'
import ru from 'javascript-time-ago/locale/ru'
import { MostikiSvg } from '@ui/SVGS'
import { UserBox } from '@/ui/components/userBox'
import { Img, ImgBox } from '@/ui/components/img'

export const metadata: Metadata = {
  title: 'Кейсы',
  description: 'Здесь можно расслабится и покрутить кейсы. Интересно, что же выпадет?',
}

TimeAgo.addLocale(ru)
const timeAgo = new TimeAgo('ru-RU')

export default async function CasePage() {
  const { user } = await validate()
  const [Cases, Drops, casesPurchases] = await Promise.all([
    getCases(),
    getDrops(),
    getAllCasesPurchases(),
  ])

  async function Add(Case: Case, Drop: Drop, price: number, { rarity, Item, DropItem }: Info) {
    'use server'

    if (!rarity || !Item || !DropItem || !user) {
      throw new Error('Произошла ошибка при выдаче')
    }

    await AddCasePurchase(user._id, { Case, Drop, DropItem, Item, rarity }, price)
    await GetCosmetic(user.name, { DropItem, Item })

    revalidateTag('userLike')
  }

  return (
    <MaxSize className={cn('items-center] flex flex-col justify-center')}>
      <H1
        reload={async () => {
          'use server'
          revalidateTag('all')
        }}
        paths={[
          { displayname: 'Магазин', name: 'shop' },
          { displayname: 'Кейсы', name: 'case' },
        ]}
      >
        Кейсы
      </H1>
      <CaseClient Cases={Cases} Drops={Drops} user={user} Add={Add} />

      <p className='mt-12 mb-8 text-center'>Самые дорогие выбитые косметики за последнее время</p>

      <GContainer className='grid-cols-autofit-[300px] mb-10 gap-6 *:h-[200px] *:w-[300px]' border>
        {casesPurchases.slice(0, 4).map(({ user, DropItem, cost, createdAt, rarity, img }) => {
          return (
            <GBox key={user._id}>
              <ImgBox
                className={cn(
                  'rounded-base box flex h-[200px] w-[300px] items-center justify-center overflow-hidden bg-[rgb(18,13,25)] transition-all duration-1000',
                  rarity
                )}
                hover
              >
                <div className='absolute left-[50%] w-full bottom-0 -translate-x-1/2 z-10 borderbox rounded-none flex justify-center items-center'>
                  <UserBox name={user.name} photo={user.photo}/>
                </div>
                <p className='absolute top-4 left-8 z-10 opacity-80'>
                  {cost} <MostikiSvg />
                </p>
                <p className='absolute top-4 right-8 z-10 opacity-80'>
                  {timeAgo.format(new Date(createdAt || 0), 'mini')}
                </p>
                {img ? (
                  <Img
                    src={img}
                    alt={DropItem?.displayname || 'Картинка'}
                    className='object-cover'
                  />
                ) : (
                  <h4>{DropItem?.displayname}</h4>
                )}
              </ImgBox>
            </GBox>
          )
        })}
      </GContainer>
    </MaxSize>
  )
}
