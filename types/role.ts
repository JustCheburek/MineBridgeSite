export interface Role {
  id: string
  name: string
  color: number
  hoist: boolean
  icon?: string
  unicode_emoji?: string
  position: number
  permissions: string
  managed: boolean
  mentionable: boolean
  tags?: {
    bot_id?: string
    integration_id?: string
    premium_subscriber?: string
    subscription_listing_id?: string
  }
  flags: number
}
