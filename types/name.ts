import {prop} from "@typegoose/typegoose";
import {Types} from "mongoose";

export class Name<N = string, D = string> {
	@prop({type: () => Types.ObjectId, required: true, unique: true})
	public _id: Types.ObjectId

	@prop({trim: true, type: () => String})
	public name!: N

	@prop({trim: true, type: () => String})
	public displayname!: D
}

export class UniqueName<N = string, D = string> {
	@prop({type: () => Types.ObjectId, required: true, unique: true})
	public _id!: Types.ObjectId

	@prop({unique: true, required: true, trim: true, type: () => String})
	public name!: N

	@prop({unique: true, required: true, trim: true, type: () => String})
	public displayname!: D
}