// noinspection JSPotentiallyInvalidUsageOfClassThis

import {Punishment} from "@src/types/punishment";
import {CasePurchase, StickerPurchase} from "@src/types/purchase";
import {modelOptions, pre, prop, ReturnModelType} from "@typegoose/typegoose";
import {From} from "@src/types/invite";
import axios from "axios";
import type {Role} from "@src/types/role";


@pre<User>("save", function () {
	this.rating = this.punishments?.reduce((accum, {rating}) => accum + rating, 0) || 0
})

@modelOptions({schemaOptions: {collection: "users", timestamps: true, _id: false}})
export class User {
	@prop({required: true, unique: true, index: true})
	public _id!: string

	@prop({required: true, unique: true, trim: true, maxlength: 22, minlength: 4})
	public name!: string

	@prop({required: true, unique: true})
	public email!: string

	@prop({required: true, trim: true, maxlength: 150})
	public photo!: string

	@prop()
	public googleId?: string

	@prop()
	public discordId?: string

	@prop({default: false})
	public whitelist!: boolean

	@prop({default: 0})
	public mostiki!: number

	@prop({default: 0})
	public rating!: number

	@prop({type: () => [Punishment]})
	public punishments!: Punishment[]

	@prop({type: () => [CasePurchase]})
	public casesPurchases!: CasePurchase[]

	@prop({type: () => [StickerPurchase]})
	public stickersPurchases!: StickerPurchase[]

	@prop({type: () => From})
	public from!: From

	// Список с айди игроков
	@prop({type: () => [String]})
	public invites!: string[]

	@prop()
	public createdAt!: Date

	@prop()
	public updatedAt!: Date

	public static async getRoles(this: ReturnModelType<typeof User>, discordId: string): Promise<Role[]> {
		const roles = await axios.get<Role[]>(
				`https://discord.com/api/guilds/${process.env.DISCORD_GUILD_ID}/roles`,
				{
					headers: {
						Authorization: `Bot ${process.env.DISCORD_TOKEN}`
					}
				}
		).then(r => r.data);

		const dsUser = await axios.get<GuildDSUser>(
				`https://discord.com/api/guilds/${process.env.DISCORD_GUILD_ID}/members/${discordId}`,
				{
					headers: {
						Authorization: `Bot ${process.env.DISCORD_TOKEN}`
					}
				}
		).then(r => r.data);

		return roles.filter(({id}) => dsUser.roles.includes(id))
	}
}

export interface DSUser {
	id: string
	username: string
	discriminator?: string
	global_name?: string
	avatar: string
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