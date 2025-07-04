import { prop } from '@typegoose/typegoose'
import type { SocialName } from '@/const'

export class Social {
  @prop({ type: String })
  public social?: SocialName

  @prop({ trim: true })
  public name?: string

  @prop({ trim: true })
  public url?: string
}
