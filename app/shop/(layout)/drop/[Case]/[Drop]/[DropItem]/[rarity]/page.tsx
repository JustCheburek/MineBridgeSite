import { Box, Section, Text } from '@components/shop'
import { Url } from '@components/button'
import { Case, Drop, RarityNames, RarityType } from '@/types/case'
import { getCase, getDrop, getItems } from '@services/shop'
import { H1 } from '@components/h1'
import { Img, ImgBox } from '@components/img'
import type { Metadata } from 'next'
import { redirect } from 'next/navigation'
import { cn } from '@/lib/utils'

type ParamsProp = {
  params: Promise<{
    Case: Case['name']
    Drop: Drop['name']
    DropItem: Drop['name']
    rarity: RarityType
  }>
}

export const generateMetadata = async ({ params }: ParamsProp): Promise<Metadata> => {
  const { Case: CaseName, Drop: DropName, DropItem: DropItemName, rarity } = await params
  const [Case, Drop, DropItem] = await Promise.all([
    getCase({ name: CaseName }),
    getDrop({ name: DropName }),
    getDrop({ name: DropItemName }),
  ])

  let DropTitle = DropItem.displayname
  if (Drop.displayname !== DropItem.displayname) {
    DropTitle += ` (${Drop.displayname})`
  }

  return {
    title: `${Case.displayname} кейс • ${RarityNames[rarity]} дроп: ${DropTitle}`,
    description: `Выберите предмет! ${RarityNames[rarity]} дроп: ${DropTitle}. ${Case.displayname} кейс.`,
  }
}

export default async function Items({ params }: ParamsProp) {
  const { Case: CaseName, Drop: DropName, DropItem: DropItemName, rarity } = await params
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
        ]}
      >
        Предмет
      </H1>
      <Section>
        {Items.map((Item, index) => (
          <Box key={Item.name} casebox={index === 2}>
            <ImgBox className={cn(`rounded-base h-[160px] w-[280px]`, 'box', rarity)} hover>
              <Img src={`/shop/${DropItem.name}/${Item.name}.webp`} alt={Item.displayname} />
            </ImgBox>
            <Text>
              <h3>{Item.displayname}</h3>
              <Url
                href={`/shop/drop/${CaseName}/${DropName}/${DropItemName}/${rarity}/${Item.name}`}
                className='my-[10px]'
              >
                Выбрать
              </Url>
            </Text>
          </Box>
        ))}
      </Section>
    </div>
  )
}
