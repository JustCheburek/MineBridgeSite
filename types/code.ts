import { modelOptions, prop } from '@typegoose/typegoose'

@modelOptions({
  schemaOptions: { collection: 'codes', timestamps: true, overwriteModels: true },
  options: { customName: 'Code' },
})
export class Code {
  @prop({ required: true })
  public _id!: string

  @prop({ required: true })
  public authorId!: string

  @prop({ required: true, min: 1 })
  public mostiki!: number
}
