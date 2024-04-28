import {prop} from "@typegoose/typegoose";

export class Name<N = string, D = string> {
	@prop({trim: true, type: () => String})
	public name!: N

	@prop({trim: true, type: () => String})
	public displayname!: D
}

export class UniqueName<N = string, D = string> {
	@prop({unique: true, required: true, trim: true, type: () => String})
	public name!: N

	@prop({unique: true, required: true, trim: true, type: () => String})
	public displayname!: D
}