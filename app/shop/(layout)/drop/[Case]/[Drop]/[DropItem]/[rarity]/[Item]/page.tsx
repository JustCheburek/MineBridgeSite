import { getCase, getDrop, getItem, getItems } from '@services/shop'
import { Img, ImgBox } from '@components/img'
import { Case, Drop, Item, RarityCost, RarityNames, type RarityType } from '@/types/case'
import { validate } from '@services/user/validate'
import { MostikiSvg } from '@ui/SVGS'
import type { Metadata } from 'next'
import { redirect } from 'next/navigation'
import { H1 } from '@components/h1'
import { Button, Url } from '@components/button'
import { User } from 'lucia'
import { AddCasePurchase, GetCosmetic } from '@services/user/casePurchase'
import { CaseData } from '@/types/purchase'
import { cn } from '@/lib/utils'

type ParamsProp = {
  params: Promise<{
    Case: Case['name']
    Drop: Drop['name']
    DropItem: Drop['name']
    rarity: RarityType
    Item: Item['name']
  }>
}

export const generateMetadata = async ({ params }: ParamsProp): Promise<Metadata> => {
  const {
    Case: CaseName,
    Drop: DropName,
    DropItem: DropItemName,
    rarity,
    Item: ItemName,
  } = await params
  const [Case, Drop, DropItem] = await Promise.all([
    getCase({ name: CaseName }),
    getDrop({ name: DropName }),
    getDrop({ name: DropItemName }),
  ])

  let DropTitle = DropItem.displayname
  if (Drop.displayname !== DropItem.displayname) {
    DropTitle += ` (${Drop.displayname})`
  }

  // Items
  const Items = await getItems(rarity, DropItem)
  if (Items?.length === 0 || !Items) {
    redirect(`/shop/drop/${CaseName}/${DropName}/${DropItemName}`)
  }

  const Item = await getItem({ name: ItemName }, Items)
  if (!Item) {
    redirect(`/shop/drop/${CaseName}/${DropName}/${DropItemName}/${rarity}`)
  }

  return {
    title: `${Item.displayname} • ${Case.displayname} кейс • ${RarityNames[rarity]} дроп: ${DropTitle}`,
    description: `${Item.displayname}! ${RarityNames[rarity]} дроп: ${DropTitle}. ${Case.displayname} кейс.`,
  }
}

function BuyButton({
  user,
  price,
  caseData,
}: {
  user: User | null
  price: number
  caseData: CaseData
}) {
  if (!user) {
    return <Url href='/auth'>Войти</Url>
  }

  if (price > user.mostiki) {
    return (
      <Url
        href={`/shop/buy?mostiki=${price - user.mostiki}`}
        danger
        title={`Не хватает ${price - user.mostiki}м`}
      >
        Баланс
      </Url>
    )
  }

  return (
    <form
      action={async () => {
        'use server'
        await AddCasePurchase(user._id, caseData, price)
        await GetCosmetic(user.name, caseData)
      }}
    >
      <Button>Купить</Button>
    </form>
  )
}

export default async function ShowCase({ params }: ParamsProp) {
  const {
    Case: CaseName,
    Drop: DropName,
    DropItem: DropItemName,
    rarity,
    Item: ItemName,
  } = await params
  const { user, isHelper } = await validate()

  const [Case, Drop, DropItem] = await Promise.all([
    getCase({ name: CaseName }),
    getDrop({ name: DropName }),
    getDrop({ name: DropItemName }),
  ])

  // Items
  const Items = await getItems(rarity, DropItem)
  if (Items?.length === 0 || !Items) {
    redirect(`/shop/drop/${CaseName}/${DropName}/${DropItemName}`)
  }

  const Item = await getItem({ name: ItemName }, Items)
  if (!Item) {
    redirect(`/shop/drop/${CaseName}/${DropName}/${DropItemName}/${rarity}`)
  }

  const fullPrice = DropItem?.price * 2 + RarityCost[rarity]

  let userHave = 0
  if (user) {
    userHave = user.casesPurchases.reduce((accum, purchase) => {
      if (purchase.Item === Item._id) {
        accum += 1
      }
      return accum
    }, 0)
  }

  return (
    <div>
      <H1
        paths={[
          { displayname: 'Магазин', name: 'shop', hide: true },
          { displayname: 'Дроп', name: 'drop', hide: true },
          { displayname: `${Case.displayname} кейс`, name: Case.name },
          { displayname: Drop.displayname, name: Drop.name },
          { displayname: DropItem.displayname, name: DropItem.name },
          { displayname: `${RarityNames[rarity]} дроп`, name: rarity },
          { displayname: Item.displayname, name: Item.name },
        ]}
      >
        {Item?.displayname}
      </H1>

      <div className="grid justify-center items-center gap-4 sm:grid-cols-2">
        {DropItem.name !== 'suffix' ? (
          <ImgBox className={cn(`rounded-base h-[160px] w-[280px]`, 'box', rarity)} hover>
            <Img src={`/shop/${DropItem.name}/${Item.name}.webp`} alt={Item.displayname} />
          </ImgBox>
        ) : (
          <p
            className={cn(`rounded-base grid place-items-center text-center h-[160px] w-[280px]`, 'box', rarity)}
          >
            Суффикс
          </p>
        )}
        <div className="sm:order-[-1] mx-auto">
          <p className={rarity}>{RarityNames[rarity]}</p>
          <p>{DropItem?.description}</p>
          <p>
            Конечная цена: {fullPrice} <MostikiSvg />
          </p>
          <p>У тебя есть: {userHave}</p>
        </div>
      </div>
      <div className="grid justify-center items-center gap-4 mt-4 sm:grid-cols-2">
        <ImgBox hover>
          <Img src={`/shop/${Case.name}.png`} alt={`${Case.displayname} кейс`} width={185} />
        </ImgBox>
        <div className="sm:text-right mx-auto">
          <p>{Case?.displayname}</p>
          <p>{Drop?.displayname}</p>
          <p>
            {Case?.price + Drop?.price} <MostikiSvg />
          </p>
        </div>
      </div>

      <BuyButton user={user} price={fullPrice} caseData={{ rarity, Item, Case, Drop, DropItem }} />

      {isHelper && (
        <div className='text-light-gray mx-auto'>
          {DropItem.give &&
            <p>
              Право:{" "}
              <code>
                {DropItem.give}.{DropItem.name}.{Item.name}
              </code>
            </p>
          }
          <p>
            Case: <code>{Case._id.toString()}</code>
          </p>
          <p>
            Drop: <code>{Drop._id.toString()}</code>
          </p>
          <p>
            DropItem: <code>{DropItem._id.toString()}</code>
          </p>
          <p>
            Item: <code>{Item._id.toString()}</code>
          </p>
          <p>
            rarity: <code>{rarity}</code>
          </p>
        </div>
      )}
    </div>
  )
}
