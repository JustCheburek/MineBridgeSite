import {modelOptions, prop} from "@typegoose/typegoose";
import type {Ref} from "@typegoose/typegoose";
import {Drop, Item, type RarityType} from "@src/types/case";
import {Sticker} from "@src/types/sticker";

@modelOptions({schemaOptions: {collection: "casesPurchases", timestamps: true}})
export class CasePurchase {
	@prop({ref: () => Item})
	public item?: Ref<Item>

	@prop({type: () => String})
	public rarity?: RarityType

	@prop({ref: () => Drop})
	public drop?: Ref<Drop>

	@prop()
	public createdAt!: Date

	@prop()
	public updatedAt!: Date
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