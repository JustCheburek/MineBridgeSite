import {modelOptions, prop} from "@typegoose/typegoose";

@modelOptions({schemaOptions: {collection: "form", timestamps: true}})
export class Form {
	@prop({default: false, required: true})
	public clicked!: boolean

	@prop({default: 0, required: true})
	public showedTimes!: number
}