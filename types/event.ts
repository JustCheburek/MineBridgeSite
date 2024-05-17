import {modelOptions, prop} from "@typegoose/typegoose";
import {Types} from "mongoose";

@modelOptions({schemaOptions: {collection: "news", timestamps: true}})
export class Event {
	@prop({required: true})
	public heading!: string

	@prop({required: true})
	public text!: string

	@prop({required: true})
	public image!: string

	@prop({required: true})
	public pi!: number

	@prop({required: true, type: () => Types.ObjectId})
	public author!: Types.ObjectId

	@prop({type: [Types.ObjectId]})
	public likes: Types.ObjectId[]

	@prop({type: [Types.ObjectId]})
	public dislikes: Types.ObjectId[]

	@prop({required: true, default: new Date()})
	public startAt!: Date

	@prop({required: true, default: new Date()})
	public endAt!: Date
}