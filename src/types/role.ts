import {modelOptions, prop} from "@typegoose/typegoose";

export const Roles = {
	"1111163413264076820": "GAMER",
	"1210916739467055105": "JUNIOR_MODER",
	"1012624358671388712": "MODER",
	"1012334978211782767": "ADMIN"
}

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