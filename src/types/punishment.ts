import {modelOptions, prop} from "@typegoose/typegoose";

@modelOptions({schemaOptions: {collection: "punishments", timestamps: true}})
export class Punishment {
	@prop({required: true, trim: true})
	public reason!: string

	@prop({required: true})
	public rating!: number

	@prop({required: true, trim: true})
	public author!: string
}