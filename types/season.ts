import { modelOptions, prop } from '@typegoose/typegoose'

@modelOptions({
  schemaOptions: { collection: 'seasons', timestamps: true, overwriteModels: true },
  options: { customName: 'Season' },
})
export class Season {
  @prop({ required: true, unique: true })
  public number!: number

  @prop({ required: true, default: new Date() })
  public startAt!: Date

  @prop({ required: true, default: new Date() })
  public endAt!: Date
}
