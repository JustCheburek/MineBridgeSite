import {modelOptions, prop} from "@typegoose/typegoose";
import type {Ref} from "@typegoose/typegoose";
import {Case, Drop, Item, type RarityType} from "@/types/case";
import {Sticker} from "@/types/sticker";

@modelOptions({schemaOptions: {collection: "casesPurchases", timestamps: true}})
export class CasePurchase {
	@prop({ref: () => Item})
	public Item!: Item["_id"]

	@prop({type: () => String})
	public rarity!: RarityType

	@prop({ref: () => Drop})
	public Drop!: Ref<Drop>

	@prop({ref: () => Case})
	public Case!: Ref<Case>

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