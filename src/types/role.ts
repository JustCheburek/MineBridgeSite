import {modelOptions, prop} from "@typegoose/typegoose";

@modelOptions({schemaOptions: {collection: "roles", timestamps: true}})
export class Role {
	@prop({required: true, unique: true, trim: true})
	public name!: string

	@prop({required: true, unique: true, trim: true})
	public displayname!: string

	@prop({required: true})
	public color!: string

	@prop()
	public createdAt!: Date

	@prop()
	public updatedAt!: Date
}