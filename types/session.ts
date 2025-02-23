import {modelOptions, prop} from "@typegoose/typegoose";

@modelOptions({schemaOptions: {collection: "sessions", _id: false, overwriteModels: true}, options: {customName: "Session"}})
export class Session {
	@prop({required: true})
	public _id!: string

	@prop({required: true})
	public user_id!: string

	@prop({required: true})
	public expires_at!: Date
}