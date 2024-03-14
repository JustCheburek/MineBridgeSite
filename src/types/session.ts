import {modelOptions, prop} from "@typegoose/typegoose";

@modelOptions({schemaOptions: {collection: "sessions"}})
export class Session {
	@prop({required: true, unique: true})
	public _id!: string

	@prop({required: true})
	public user_id!: string

	@prop({required: true})
	public expires_at!: Date
}