// noinspection JSPotentiallyInvalidUsageOfClassThis
import {Punishment} from "@/types/punishment";
import {CasePurchase, StickerPurchase} from "@/types/purchase";
import {modelOptions, pre, prop, ReturnModelType} from "@typegoose/typegoose";
import {From} from "@/types/invite";
import {userModel} from "@server/models";
import {cookies} from "next/headers";
import {Social} from "@/types/url";
import {getUser} from "@/services";
import {AUTO} from "@/const";
import {MostikiHUBConsole, MostikiMBConsole, StarsHUBConsole, StarsMBConsole} from "@services/console";

async function updateRating(this: User) {
    this.rating = this.punishments?.reduce(
        (accum, {rating}) => accum + rating, 0
    )
}

@pre<User>("save", updateRating)
@pre<User>("findOneAndUpdate", updateRating)
@pre<User>("findOne", updateRating)
@modelOptions({schemaOptions: {collection: "users", timestamps: true, _id: false}})
export class User {
    @prop({required: true})
    public _id!: string

    @prop({required: true, unique: true, trim: true, maxlength: 30, minlength: 1})
    public name!: string

    @prop({required: true, unique: true})
    public email!: string

    @prop({required: true, trim: true, maxlength: 1000})
    public photo!: string

    @prop({trim: true, maxlength: 1000})
    public fullPhoto?: string

    @prop()
    public googleId?: string

    @prop()
    public discordId?: string

    @prop()
    public twitchId?: string

    @prop({default: 0})
    public mostiki!: number

    @prop({default: 0})
    public rating!: number

    @prop({type: () => [Punishment]})
    public punishments!: Punishment[]

    @prop({type: () => [CasePurchase]})
    public casesPurchases!: CasePurchase[]

    @prop({trim: true, maxlength: 15})
    public suffix?: string

    @prop({type: () => [StickerPurchase]})
    public stickersPurchases!: StickerPurchase[]

    @prop({type: () => From})
    public from?: From

    // Список с айди игроков
    @prop({type: () => [String], unique: true})
    public invites!: string[]

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
        user: User,
    ): Promise<From> {
        try {
            const cookiesStore = await cookies()
            const from: { place: string, name: string } = JSON.parse(cookiesStore.get("from")?.value ?? "{}")
            if (!from) return {}

            const {place, name} = from
            if (!name || !place || user.name === name) {
                return {place: undefined, userId: undefined}
            }

			const {user: inviter, isContentMaker} = await getUser({name})

            if (!inviter || JSON.stringify(user._id) === JSON.stringify(inviter._id)) {
                return {place: undefined, userId: undefined}
            }

            if (!inviter.invites.some(id => JSON.stringify(id) === JSON.stringify(user._id))) {
                let mostiki = 0
                if (isContentMaker) {
					mostiki = 10
				}

                await userModel.findByIdAndUpdate(
                    inviter._id,
					{
                        $push: {
							invites: user._id,
                            punishments: {
                                reason: `Позвал ${user.name}`,
                                rating: 5,
                                author: AUTO.MOD,
                                createdAt: new Date(),
                                updatedAt: new Date()
                            }
                        },
                        $inc: {
                            rating: 5,
                            mostiki
                        }
                    }
                )

                await Promise.all([
                    MostikiMBConsole(mostiki, name),
                    MostikiHUBConsole(mostiki, name),
                    StarsMBConsole(5, name),
                    StarsHUBConsole(5, name)
                ])
            }

            return {place, userId: inviter._id}
        } catch (e) {
            console.error(e)
            return {place: undefined, userId: undefined}
        }
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

export interface DataTw {
    data: TwUser[]
}

export interface TwUser {
    id: string
    login: string
    display_name: string
    type: "" | "admin" | "global_mod" | "staff"
    broadcaster_type: "" | "affiliate" | "partner"
    description: string
    profile_image_url: string
    offline_image_url: string
    email: string
    created_at: Date
}
