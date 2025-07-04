// noinspection JSPotentiallyInvalidUsageOfClassThis
import { Punishment } from '@/types/punishment'
import { CasePurchase, StickerPurchase } from '@/types/purchase'
import { modelOptions, pre, prop } from '@typegoose/typegoose'
import { From } from '@/types/invite'
import { Social } from '@/types/url'
import { Notifications } from '@/types/notification'

async function updateRating(this: User) {
  this.rating = this.punishments?.reduce((accum, { rating }) => accum + rating, 0)
}

@pre<User>('save', updateRating)
@pre<User>('findOneAndUpdate', updateRating)
@pre<User>('findOne', updateRating)
@modelOptions({
  schemaOptions: { collection: 'users', timestamps: true, _id: false, overwriteModels: true },
  options: { customName: 'User' },
})
export class User {
  // Основные поля
  @prop({ required: true })
  public _id!: string

  @prop({ required: true, unique: true, trim: true, maxlength: 30, minlength: 1 })
  public name!: string

  @prop({ required: true, unique: true })
  public email!: string

  @prop({ required: true, trim: true, maxlength: 1000 })
  public photo!: string

  @prop({ trim: true, maxlength: 1000 })
  public fullPhoto?: string

  // id
  @prop()
  public googleId?: string

  @prop()
  public discordId?: string

  @prop()
  public twitchId?: string

  // Накопления
  @prop({ default: 0, min: 0 })
  public mostiki!: number

  @prop({ default: 0 })
  public rating!: number

  @prop({ default: 0 })
  public faded_rating!: number

  // Проходки
  @prop({ default: false })
  public whitelist!: boolean

  // Истории
  @prop({ type: () => [Punishment] })
  public punishments!: Punishment[]

  @prop({ type: () => [CasePurchase] })
  public casesPurchases!: CasePurchase[]

  // Суффикс
  @prop({ trim: true, maxlength: 15 })
  public suffix?: string

  @prop({ type: () => [StickerPurchase] })
  public stickersPurchases!: StickerPurchase[]

  @prop({ type: () => From })
  public from?: From

  @prop({ type: () => [Social] })
  public socials: Social[]

  @prop({ type: () => [String], unique: true })
  public invites!: string[]

  @prop({ type: () => Notifications })
  public notifications!: Notifications

  // Даты
  @prop()
  public createdAt!: Date

  @prop()
  public updatedAt!: Date

  @prop({ default: new Date() })
  public onlineAt!: Date
}

export interface DSUser {
  id: string
  username: string
  discriminator?: string
  global_name?: string
  avatar?: string
  bot?: boolean
  system?: boolean
  mfa_enabled?: boolean
  banner?: string
  accent_color?: number
  locale?: string
  verified?: boolean
  email?: string
  flags?: number
  premium_type?: number
  public_flags?: number
  avatar_decoration?: string
}

export interface GuildDSUser {
  user: DSUser
  nick?: string
  avatar?: string
  roles: string[]
  joined_at: Date
  premium_since?: Date
  deaf: boolean
  mute: boolean
  flags: number
  pending?: boolean
  permissions?: string
  communication_disabled_until?: Date
}

export interface GUser {
  sub: string
  email?: string
  email_verified?: boolean
  hd: string
  name: string
  given_name?: string
  locale?: string
  picture?: string
  profile?: string
}

export interface DataTw {
  data: TwUser[]
}

interface TwUser {
  id: string
  login: string
  display_name: string
  type: '' | 'admin' | 'global_mod' | 'staff'
  broadcaster_type: '' | 'affiliate' | 'partner'
  description: string
  profile_image_url: string
  offline_image_url: string
  email: string
  created_at: Date
}
