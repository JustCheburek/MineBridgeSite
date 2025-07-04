import { prop } from '@typegoose/typegoose'

export class Sticker {
  @prop({ required: true, trim: true, unique: true })
  public name!: string

  @prop({ required: true })
  public price!: number

  @prop({ required: true })
  public img!: string
}
