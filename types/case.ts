import { modelOptions, prop } from '@typegoose/typegoose'
import { Name, UniqueName } from '@/types/name'

export const RarityCost = {
  common: 0,
  uncommon: 80,
  rare: 190,
  epic: 300,
  mythic: 410,
  legendary: 520,
}

const CaseNames = {
  common: 'Обычный',
  rare: 'Редкий',
  legendary: 'Легендарный',
}
export type CaseType = keyof typeof CaseNames

export const RarityNames = {
  common: 'Обычный',
  uncommon: 'Необычный',
  rare: 'Редкий',
  epic: 'Эпический',
  mythic: 'Мифический',
  legendary: 'Легендарный',
}
export const rarityNames = Object.keys(RarityNames) as RarityType[]
export type RarityType = keyof typeof RarityNames

const DropNames = {
  all: 'Весь дроп',
  particleeffects: 'Частицы',
  suffix: 'Суффикс',
  deatheffects: 'Эффекты смерти',
  pets: 'Питомец',
  rename: 'Скины',
}
export type DropType = keyof typeof DropNames

export class Chance<N = string> {
  @prop({ required: true, type: () => String })
  public name!: N

  @prop({ required: true })
  public chance!: number
}

type RarityChance = Chance<RarityType>
type DropChance = Chance<DropType>

@modelOptions({
  schemaOptions: { collection: 'cases', overwriteModels: true },
  options: { customName: 'Case' },
})
export class Case extends UniqueName<CaseType> {
  @prop()
  public oldPrice?: number

  @prop({ required: true })
  public price!: number

  @prop({ required: true, type: () => [Chance<RarityType>] })
  public rarity!: RarityChance[]

  @prop({ required: true, type: () => [Chance<DropType>] })
  public drop!: DropChance[]
}

@modelOptions({ schemaOptions: { collection: 'items' } })
export class Item extends Name {
  @prop({ default: true, required: true })
  public img!: boolean
}

type Give = 'ultracosmetics' | 'cmn'

@modelOptions({
  schemaOptions: { collection: 'drops', overwriteModels: true },
  options: { customName: 'Drop' },
})
export class Drop extends UniqueName<DropType> {
  @prop({ required: true, unique: true, trim: true })
  public description!: string

  @prop({ default: 0 })
  public price!: number

  @prop({ type: () => String })
  public defaultRarity?: RarityType

  @prop({ type: () => String })
  public give?: Give

  @prop({ type: () => [Item] })
  public common?: Item[]

  @prop({ type: () => [Item] })
  public uncommon?: Item[]

  @prop({ type: () => [Item] })
  public rare?: Item[]

  @prop({ type: () => [Item] })
  public epic?: Item[]

  @prop({ type: () => [Item] })
  public mythic?: Item[]

  @prop({ type: () => [Item] })
  public legendary?: Item[]

  @prop({ type: () => [Item] })
  public drop?: Item[]
}

export interface Info {
  Item?: Item
  rarity?: RarityType
  DropItem?: Drop
  img?: string
}
