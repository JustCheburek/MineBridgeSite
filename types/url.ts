import {prop} from "@typegoose/typegoose";

export class Social {
	@prop({trim: true})
	public social?: string

	@prop({default: 0})
	public clicked?: number

	@prop({trim: true})
	public name?: string

	@prop({trim: true})
	public url?: string
}