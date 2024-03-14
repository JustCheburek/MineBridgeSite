import {prop} from "@typegoose/typegoose";

export class Name {
	@prop({required: true, unique: true, trim: true})
	public name!: string

	@prop({required: true, trim: true})
	displayname!: string
}