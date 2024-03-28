import {prop} from "@typegoose/typegoose";

export class From {
	@prop()
	public place?: string

	@prop({unique: true, required: true})
	public userId!: string
}