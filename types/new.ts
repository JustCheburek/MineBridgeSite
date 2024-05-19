import {modelOptions, prop} from "@typegoose/typegoose";

@modelOptions({schemaOptions: {collection: "news", timestamps: true}})
export class New {
	@prop({required: true})
	public heading!: string

	@prop()
	public href?: string

	@prop()
	public text?: string

	@prop()
	public image?: string

	@prop()
	public startAt?: Date

	@prop()
	public endAt?: Date

	@prop()
	public createdAt?: Date

	@prop()
	public updatedAt?: Date
}