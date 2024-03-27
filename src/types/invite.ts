import {prop} from "@typegoose/typegoose";

export class From {
	@prop()
	public place?: string

	@prop()
	public userId?: string
}