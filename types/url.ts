import {prop} from "@typegoose/typegoose";
import type {SVGS_NAME} from "@ui/SVGS";

export class Social {
	@prop({type: String})
	public social?: SVGS_NAME

	@prop({default: 0})
	public clicked!: number

	@prop({trim: true})
	public name?: string

	@prop({trim: true})
	public url?: string
}