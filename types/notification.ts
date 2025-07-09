import { prop } from '@typegoose/typegoose'

export const notificationsLabels = [
  { name: 'code', label: 'Код' },
  { name: 'news', label: 'Новости' },
  { name: 'mostiki', label: 'Мостики' },
  { name: 'rating', label: 'Звёзды' },
  { name: 'invite', label: 'Приглашения' },
]

export class Notifications {
  @prop({ default: true })
  public news!: boolean

  @prop({ default: true })
  public mostiki!: boolean

  @prop({ default: true })
  public rating!: boolean

  @prop({ default: true })
  public hours!: boolean

  @prop({ default: true })
  public invite!: boolean

  @prop({ default: true })
  public code!: boolean
}
