import {modelOptions, prop} from "@typegoose/typegoose";
import {New} from "@/types/new";
import {Event} from "@/types/event";

@modelOptions({schemaOptions: {collection: "seasons", timestamps: true}})
export class Season {
	@prop({required: true, unique: true})
	public number!: number

	@prop({type: () => [New]})
	public news!: New[]

	@prop({type: () => [Event]})
	public events!: Event[]

	@prop({required: true, default: new Date()})
	public startAt!: Date

	@prop({required: true, default: new Date()})
	public endAt!: Date
}