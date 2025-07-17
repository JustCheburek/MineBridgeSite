import { prop } from '@typegoose/typegoose'

export const urlsLabels = [
  { name: 'vk', label: 'ВК' },
  { name: 'twitch', label: 'Твич' },
  { name: 'youtube', label: 'Ютуб' },
  { name: 'donationAlerts', label: 'Донат' },
]

export class Urls {
  @prop()
  public vk?: string

  @prop()
  public twitch?: string

  @prop()
  public youtube?: string

  @prop()
  public donationAlerts?: string
}