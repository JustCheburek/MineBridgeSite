import {modelOptions, prop} from "@typegoose/typegoose";
import type {Ref} from "@typegoose/typegoose";
import {Drop, Item, type RarityType} from "@src/types/case";
import {Sticker} from "@src/types/sticker";

@modelOptions({schemaOptions: {collection: "casesPurchases", timestamps: true}})
export class CasePurchase {
	@prop({required: true, ref: () => Item})
	public item!: Ref<Item>

	@prop({required: true, type: () => String})
	public rarity!: RarityType

	@prop({required: true, ref: () => Drop})
	public drop!: Ref<Drop>

	@prop()
	public createdAt!: Date

	@prop()
	public updatedAt!: Date
}

@modelOptions({schemaOptions: {collection: "stickersPurchases", timestamps: true}})
export class StickerPurchase {
	@prop({ref: () => Sticker})
	public sticker!: Ref<Sticker>

	@prop({required: true, trim: true})
	public text!: string

	@prop()
	public createdAt!: Date

	@prop()
	public updatedAt!: Date
}