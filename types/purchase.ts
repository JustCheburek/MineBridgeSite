import {modelOptions, prop} from "@typegoose/typegoose";
import type {Ref} from "@typegoose/typegoose";
import {Case, Drop, Item, type RarityType} from "@/types/case";
import {Sticker} from "@/types/sticker";
import {Types} from "mongoose";

export interface CaseData {
	Case: Case
	Drop: Drop
	DropItem: Drop
	Item: Item
	rarity: RarityType
	suffix?: string
	createdAt?: Date
	updatedAt?: Date
	_id?: string
}

@modelOptions({schemaOptions: {collection: "casesPurchases", timestamps: true}})
export class CasePurchase {
	@prop({required: true, index: true})
	public _id!: string

	@prop({type: () => Types.ObjectId})
	public Item!: Types.ObjectId

	@prop({type: () => String})
	public rarity!: RarityType

	@prop({type: () => Types.ObjectId})
	public Drop!: Types.ObjectId

	@prop({type: () => Types.ObjectId})
	public DropItem!: Types.ObjectId

	@prop({type: () => Types.ObjectId})
	public Case!: Types.ObjectId

	@prop()
	public suffix?: string

	@prop()
	public createdAt?: Date

	@prop()
	public updatedAt?: Date
}

@modelOptions({schemaOptions: {collection: "stickersPurchases", timestamps: true}})
export class StickerPurchase {
	@prop({ref: () => Sticker})
	public sticker!: Ref<Sticker>

	@prop({trim: true})
	public text!: string

	@prop()
	public createdAt!: Date

	@prop()
	public updatedAt!: Date
}