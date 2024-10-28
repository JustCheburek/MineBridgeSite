// noinspection JSPotentiallyInvalidUsageOfClassThis
import {Punishment} from "@/types/punishment";
import {CasePurchase, StickerPurchase} from "@/types/purchase";
import {modelOptions, pre, prop, ReturnModelType} from "@typegoose/typegoose";
import {From} from "@/types/invite";
import {userModel} from "@server/models";
import {cookies} from "next/headers";
import {Social} from "@/types/url";

function updateRating(this: User) {
	this.rating = this?.punishments?.reduce(
			(accum, {rating}) => accum + rating, 0
	)
}

@pre<User>("save", updateRating)
@pre<User>("findOneAndUpdate", updateRating)
@modelOptions({schemaOptions: {collection: "users", timestamps: true, _id: false}})
export class User {
	@prop({required: true, index: true})
	public _id!: string

	@prop({required: true, unique: true, trim: true, maxlength: 30, minlength: 4})
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
	public from?: From

	// Список с айди игроков
	@prop({type: () => [String]})
	public invites!: string[]

	@prop()
	public form!: boolean

	@prop()
	public createdAt!: Date

	@prop()
	public updatedAt!: Date

	@prop({default: new Date()})
	public onlineAt!: Date

	@prop({type: () => [Social]})
	public socials: Social[]

	public static async From(
			this: ReturnModelType<typeof User>,
			candidate: User,
	): Promise<From> {
		try {
			const cookiesStore = await cookies()
			const from: { place: string, name: string } = JSON.parse(cookiesStore.get("from")?.value ?? "{}")
			if (!from) return {}

			const {place, name} = from
			if (!name || !place || candidate.name === name) {
				return {place: undefined, userId: undefined}
			}

			const inviter = await userModel.findOne({name})

			if (!inviter || JSON.stringify(candidate._id) === JSON.stringify(inviter._id)) {
				return {place: undefined, userId: undefined}
			}

			if (!inviter.invites.includes(candidate._id)) {
				inviter.invites.push(candidate._id)
				inviter.punishments.push({
					reason: `Позвал ${candidate.name}`,
					rating: 5,
					author: "AutoMod",
					createdAt: new Date(),
					updatedAt: new Date()
				})
				inviter.rating += 5
				inviter.save()
			}

			return {place, userId: inviter._id}
		} catch (e) {
			console.error(e)
			return {place: undefined, userId: undefined}
		}
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