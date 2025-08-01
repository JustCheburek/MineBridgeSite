import { modelOptions, prop } from '@typegoose/typegoose'

@modelOptions({ schemaOptions: { collection: 'punishments', timestamps: true } })
export class Punishment {
  @prop({ trim: true })
  public reason!: string

  @prop()
  public rating!: number

  @prop({ trim: true })
  public author!: string
}
