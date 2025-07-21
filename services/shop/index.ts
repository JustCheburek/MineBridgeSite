'use server'

import { unstable_cache as cache } from 'next/cache'
import { caseModel, dropModel, userModel } from '@db/models'
import { Case, Drop, Item, RarityType } from '@/types/case'
import { CasePurchase, CaseData } from '@/types/purchase'
import { idOrName } from '@/types/idOrName'
import { User } from 'lucia'
import { GetDropCost } from '@/lib/utils'
import { MINCOST } from '@/const'

export const getCaseLocal = cache(
  async (param: idOrName, Cases: Case[]) => {
    const Case = Cases.find(
      ({ name, _id }) => name === param.name || String(_id) === String(param._id)
    )

    if (!Case) {
      console.error(`Case не найден: ${JSON.stringify(param)}`)
    }

    return Case
  },
  ['case', 'shop', 'all'],
  { revalidate: 3600, tags: ['case', 'shop', 'all'] }
)

export const getCase = cache(
  async (param: idOrName) => {
    const Case: Case | null = JSON.parse(
      JSON.stringify(
        await caseModel.findOne(
          param,
          {},
          {
            lean: true,
          }
        )
      )
    )

    if (!Case) {
      throw new Error(`Case не найден: ${JSON.stringify(param)}`)
    }

    return Case
  },
  ['case', 'shop', 'all'],
  { revalidate: 3600, tags: ['case', 'shop', 'all'] }
)

export const getCases = cache(
  async (): Promise<Case[]> =>
    JSON.parse(
      JSON.stringify(
        await caseModel.find(
          {},
          {},
          {
            lean: true,
          }
        )
      )
    ),
  ['cases', 'shop', 'all'],
  { revalidate: 3600, tags: ['cases', 'shop', 'all'] }
)

export const getDropLocal = cache(
  async (param: idOrName, Drops: Drop[]) => {
    const Drop = Drops.find(
      ({ name, _id }) => name === param.name || String(_id) === String(param._id)
    )

    if (!Drop) {
      console.error(`Drop не найден: ${JSON.stringify(param)}`)
    }

    return Drop
  },
  ['drop', 'shop', 'all'],
  { revalidate: 3600, tags: ['drop', 'shop', 'all'] }
)

export const getDrop = cache(
  async (param: idOrName) => {
    const Drop: Drop | null = JSON.parse(
      JSON.stringify(
        await dropModel.findOne(
          param,
          {},
          {
            lean: true,
          }
        )
      )
    )

    if (!Drop) {
      throw new Error(`Drop не найден: ${JSON.stringify(param)}`)
    }

    return Drop
  },
  ['drop', 'shop', 'all'],
  { revalidate: 3600, tags: ['drop', 'shop', 'all'] }
)

export const getDrops = cache(
  async () => {
    const drops: Drop[] = JSON.parse(
      JSON.stringify(
        await dropModel.find(
          {},
          {},
          {
            lean: true,
            sort: { price: -1 },
          }
        )
      )
    )

    return drops
  },
  ['drops', 'shop', 'all'],
  { revalidate: 3600, tags: ['drops', 'shop', 'all'] }
)

export const getItems = cache(
  async (rarity: RarityType, DropItem?: Drop) => {
    if (!DropItem) return []
    let Items = DropItem?.drop
    if (Items?.length === 0) {
      Items = DropItem[rarity]
    }

    if (Items?.length === 0 || !Items) {
      console.error(`Items не найден`)
    }

    return Items || []
  },
  ['items', 'shop', 'all'],
  { revalidate: 3600, tags: ['items', 'shop', 'all'] }
)

export const getItem = cache(
  async (param: idOrName, Items: Item[]) => {
    if (Items.length === 0) {
      return Items[0]
    }

    const Item = Items.find(
      ({ _id, name }) => String(_id) === String(param._id) || name === param.name
    )

    if (!Item) {
      console.error(`Item не найден: ${JSON.stringify(param)}`)
    }

    return Item
  },
  ['item', 'shop', 'all'],
  { revalidate: 3600, tags: ['item', 'shop', 'all'] }
)

interface DataWithCost extends CaseData {
  cost: number
  user: User
  img?: string
}

export const getAllCasesPurchases = cache(
  async (): Promise<DataWithCost[]> => {
    // 1. Получаем пользователей с непустым массивом casesPurchases
    const users = await userModel.find(
      { casesPurchases: { $ne: [] } }, 
      { casesPurchases: 1, name: 1, photo: 1 }
    ) as User[]
    
    // 2. Получаем все Drops и Cases
    const Drops = await getDrops()
    const Cases = await getCases()
    
    // 3. Обрабатываем каждого пользователя и создаем массив DataWithCost
    const allPurchasesWithCost: DataWithCost[] = []
    
    await Promise.all(
      users.map(async (user) => {
        // Создаем копию пользователя для модификации
        const userCopy: User = JSON.parse(JSON.stringify(user))
        
        // Обрабатываем каждую покупку, заменяя ID на объекты
        const processedPurchases = await Promise.all(
          userCopy.casesPurchases.map(async (purchase: CasePurchase): Promise<DataWithCost | null> => {
            const Drop = await getDropLocal({ _id: purchase.Drop }, Drops)
            const DropItem = await getDropLocal({ _id: purchase.DropItem }, Drops)
            const Case = await getCaseLocal({ _id: purchase.Case }, Cases)
            
            const Items = await getItems(purchase.rarity, DropItem)
            const Item = await getItem({ _id: purchase.Item }, Items)

            if (!Drop || !Case || !DropItem || !Item) {
              return null
            }

            // Создаем объект DataWithCost с полем user
            return {
              ...purchase,
              Case,
              Drop,
              DropItem,
              Item,
              cost: GetDropCost(Drop, purchase.rarity),
              user: userCopy,
              img: Item.img ? `/shop/${Drop.name}/${Item.name}.webp` : undefined
            }
          })
        )
        
        // Фильтруем null значения и добавляем в общий массив
        const validPurchases = processedPurchases.filter((purchase): purchase is DataWithCost => 
          purchase !== null && purchase.cost >= MINCOST
        )
        
        // Если есть покупки, добавляем самую дорогую в результат
        if (validPurchases.length <= 0) return null

        // Сортируем покупки по стоимости (дорогие в начале)
        validPurchases.sort((a, b) => b.cost - a.cost)
        // Добавляем только самую дорогую покупку
        allPurchasesWithCost.push(validPurchases[0])
      })
    )
    
    // 4. Сортируем по дате последней покупки
    allPurchasesWithCost.sort((a, b) => {
      const dateA = a.createdAt ? new Date(a.createdAt).getTime() : 0
      const dateB = b.createdAt ? new Date(b.createdAt).getTime() : 0
      return dateB - dateA
    })
    
    return allPurchasesWithCost
  },
  ['casesPurchases', 'shop', 'all'],
  { revalidate: 3600, tags: ['casesPurchases', 'shop', 'all'] }
)