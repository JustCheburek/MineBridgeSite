'use server'

import { RconVC } from '@services/console'
import { Drop, Item } from '@/types/case'

type DropAndItem = {
  DropItem: Drop
  Item: Item
}

export async function GetCosmetic(name: string, { DropItem, Item }: DropAndItem) {
    if (!DropItem.give) return
    const client = await RconVC()
  
    try {
      await client.send(
        `lpv user ${name} permission set ${DropItem.give}.${DropItem.name}.${Item.name}`
      )
    } catch (e) {
      console.log(e)
    }
  
    client.disconnect()
  }
  
  export async function GetCosmetics(name: string, caseDatas: Partial<DropAndItem>[]) {
    function wait(ms: number) {
      return new Promise(resolve => {
        setTimeout(() => {
          resolve('Готово')
        }, ms)
      })
    }
  
    const client = await RconVC()
  
    for (const { DropItem, Item } of caseDatas) {
      if (DropItem?.name && Item?.name && DropItem?.give) {
        await client.send(
          `lpv user ${name} permission set ${DropItem.give}.${DropItem.name}.${Item.name}`
        )
        await wait(1000)
      }
    }
  
    client.disconnect()
  }