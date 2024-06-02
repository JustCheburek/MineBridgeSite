import {modelOptions, prop} from "@typegoose/typegoose";
import {Name, UniqueName} from "@/types/name";

export const CaseNames = {
	common: "Обычный",
	rare: "Редкий",
	legendary: "Легендарный",
}
export type CaseType = keyof typeof CaseNames

export const RarityNames = {
	common: "Обычный",
	uncommon: "Необычный",
	rare: "Редкий",
	epic: "Эпический",
	mythic: "Мифический",
	legendary: "Легендарный"
}
export type RarityType = keyof typeof RarityNames

export const DropNames = {
	all: "Весь дроп",
	particleeffects: "Частицы",
	suffix: "Суффикс",
	deatheffects: "Эффекты смерти",
	pets: "Питомец"
}
export type DropType = keyof typeof DropNames

export class Chance<N = string> {
	@prop({required: true, type: () => String})
	public name!: N

	@prop({required: true})
	public chance!: number
}

export type RarityChance = Chance<RarityType>
export type DropChance = Chance<DropType>

@modelOptions({schemaOptions: {collection: "cases"}})
export class Case extends UniqueName<CaseType> {
	@prop({required: true})
	public price!: number

	@prop({required: true, type: () => [Chance<RarityType>]})
	public rarity!: RarityChance[]

	@prop({required: true, type: () => [Chance<DropType>]})
	public drop!: DropChance[]
}

@modelOptions({schemaOptions: {collection: "items"}})
export class Item extends Name {
	@prop({default: true, required: true})
	public img!: boolean
}

@modelOptions({schemaOptions: {collection: "drops"}})
export class Drop extends UniqueName<DropType> {
	@prop({required: true, unique: true, trim: true})
	public description!: string

	@prop({default: 0})
	public price!: number

	@prop({type: () => String})
	public defaultRarity?: RarityType

	@prop({type: () => [Item]})
	public common?: Item[]

	@prop({type: () => [Item]})
	public uncommon?: Item[]

	@prop({type: () => [Item]})
	public rare?: Item[]

	@prop({type: () => [Item]})
	public epic?: Item[]

	@prop({type: () => [Item]})
	public mythic?: Item[]

	@prop({type: () => [Item]})
	public legendary?: Item[]

	@prop({type: () => [Item]})
	public drop?: Item[]
}

export interface Info {
	item?: Item
	rarity?: RarityType
	drop?: Drop
	img?: string
}
