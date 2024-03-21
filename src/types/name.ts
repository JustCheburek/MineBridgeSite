import {prop} from "@typegoose/typegoose";

export class Name<N = string, D = string> {
	@prop({required: true, unique: true, trim: true, type: () => String})
	public name!: N

	@prop({required: true, unique: true, trim: true, type: () => String})
	public displayname!: D
}