import {modelOptions, prop} from "@typegoose/typegoose";

@modelOptions({schemaOptions: {collection: "news", timestamps: true}})
export class New {
	@prop({required: true})
	public heading!: string

	@prop({required: true})
	public text!: string

	@prop({required: true})
	public image!: string

	@prop({required: true, default: new Date()})
	public startAt!: Date

	@prop({required: true, default: new Date()})
	public endAt!: Date
}