// noinspection JSPotentiallyInvalidUsageOfClassThis

import {Punishment} from "@/types/punishment";
import {CasePurchase, StickerPurchase} from "@/types/purchase";
import {modelOptions, pre, prop, ReturnModelType} from "@typegoose/typegoose";
import {From} from "@/types/invite";
import axios from "axios";
import type {Role} from "@/types/role";
import {userModel} from "@server/models";
import {cookies} from "next/headers";


function RatingCount(this: User) {
	this.rating = this.punishments?.reduce((accum, {rating}) => accum + rating, 0) || 0
}

@pre<User>("save", RatingCount)
@pre<User>("findOneAndUpdate", RatingCount)

@modelOptions({schemaOptions: {collection: "users", timestamps: true, _id: false}})
export class User {
	@prop({required: true})
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
	public form!: boolean

	@prop()
	public createdAt!: Date

	@prop()
	public updatedAt!: Date

	public static async From(
			this: ReturnModelType<typeof User>,
			candidate: User,
	) {
		const userId = cookies().get("userId")?.value
		const place = cookies().get("place")?.value

		if (!userId || candidate._id === userId || !place || !userId) return {}

		const inviter = await userModel.findById(userId)

		if (!inviter) return {}

		if (!inviter.invites.includes(userId)) {
			inviter.invites.push(userId)
			inviter.punishments.push({
				reason: `Позвал ${candidate.name}`,
				rating: 5,
				author: "AutoMod",
				createdAt: new Date(),
				updatedAt: new Date()
			})
			inviter.save()
		}

		return {place, userId}
	}

	public static async updateUser(
			this: ReturnModelType<typeof User>,
			candidate: User,
			userData: User
	) {
		console.log(`Старый пользователь: ${candidate.name}`)
		userData.punishments = candidate.punishments
		userData.mostiki = candidate.mostiki
		userData.rating = candidate.rating

		await userModel.findOneAndDelete({
			name: candidate.name
		})

		return await userModel.create(userData)
	}

	public static async getRoles(
			this: ReturnModelType<typeof User>,
			discordId?: string
	): Promise<RolesApi> {
		if (!discordId) {
			return {
				roles: [],
				isModer: false,
				isAdmin: false
			}
		}

		const allRoles = await axios.get<Role[]>(
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
		).then(r => r.data).catch(console.error);

		const roles = allRoles.filter(({id}) => dsUser?.roles?.includes(id))
		const isAdmin = roles?.some(({name}) => name.toLowerCase().includes("админ"))
		const isModer = isAdmin || roles?.some(({name}) => name.toLowerCase().includes("модер"))

		return {
			roles,
			isModer, isAdmin
		}
	}
}

export interface RolesApi {
	roles: Role[],
	isModer: boolean,
	isAdmin: boolean
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