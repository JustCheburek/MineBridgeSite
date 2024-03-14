import {modelOptions, prop} from "@typegoose/typegoose";
import {Name} from "@src/types/props";

@modelOptions({schemaOptions: {collection: "purchases", timestamps: true}})
class Purchase {
	@prop({required: true})
	public price!: number
}

export class CasePurchase extends Purchase {
	@prop({ref: () => Name})
	public caseType!: Name

	@prop({ref: () => Name})
	public caseRarity!: Name

	@prop({ref: () => Name})
	public resultDrop!: Name

	@prop({ref: () => Name})
	public resultType!: Name

	@prop({ref: () => Name})
	public resultRarity!: Name
}

export class StickerPurchase extends Purchase {
	@prop({ref: () => Name})
	public stickerType!: Name
}