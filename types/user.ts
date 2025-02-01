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

function updateRating(this: User) {
    this.rating = this.punishments?.reduce(
        (accum, {rating}) => accum + rating, 0
    )
}

@pre<User>("save", updateRating)
@pre<User>("findOneAndUpdate", updateRating)
@pre<User>("findOne", updateRating)
@modelOptions({schemaOptions: {collection: "users", timestamps: true, _id: false}})
export class User {
    @prop({required: true, index: true})
    public _id!: string

    @prop({required: true, unique: true, trim: true, maxlength: 30, minlength: 4})
    public name!: string

    @prop({required: true, unique: true})
    public email!: string

    @prop({required: true, trim: true, maxlength: 1000})
    public photo!: string

    @prop()
    public googleId?: string

    @prop()
    public discordId?: string

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

            if (!inviter.invites.includes(JSON.stringify(user._id))) {
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

export interface VKUser {
    id: number
    first_name: string
    last_name: string
    can_access_closed: boolean
    is_closed: boolean
    deactivated?: string

    about?: string
    activities?: string
    bdate?: string
    blacklisted?: number
    blacklisted_by_me?: number
    books?: string
    can_post?: number
    can_see_all_posts?: number
    can_see_audio?: number
    can_send_friend_request?: number
    can_write_private_message?: number
    career?: string
    city?: {
        id: number
        title: string
    }
    common_count?: number
    connections?: {
        [key: string]: number
    }
    contacts?: {
        mobile_phone?: string
        home_phone?: string
    }
    counters?: {
        albums: number
        videos: number
        audios: number
        photos: number
        notes: number
        friends: number
        gifts: number
        groups: number
        online_friends: number
        mutual_friends: number
        user_videos: number
        user_photos: number
        followers: number
        pages: number
        subscriptions: number
    }
    country?: {
        id: number
        title: string
    }
    crop_photo?: {
        photo: {
            id: number
            album_id: number
            owner_id: number
            user_id: number
            text: string
            date: number
            sizes: {
                type: string
                url: string
                width: number
                height: number
            }[]
        }
        crop: {
            x: number
            y: number
            x2: number
            y2: number
        }
        rect: {
            x: number
            y: number
            x2: number
            y2: number
        }
    }
    domain?: string
    education?: {
        university?: number
        university_name?: string
        faculty?: number
        faculty_name?: string
        graduation?: number
    }

    first_name_nom: string
    first_name_gen: string
    first_name_dat: string
    first_name_acc: string
    first_name_ins: string
    first_name_abl: string

    followers_count?: number
    friend_status?: number
    games?: string
    has_mobile?: boolean
    has_photo?: boolean
    home_town?: string
    interests?: string
    is_favorite?: boolean
    is_friend?: boolean
    is_hidden_from_feed?: boolean
    is_no_index?: boolean

    last_name_nom: string
    last_name_gen: string
    last_name_dat: string
    last_name_acc: string
    last_name_ins: string
    last_name_abl: string

    last_seen?: {
        platform?: number
        time?: number
    }

    lists?: string
    maiden_name?: string
    military?: {
        unit: string
        unit_id: number
        from: number
        until: number
    }[]
    movies?: string
    music?: string
    nickname?: string
    occupation?: {
        type: "work" | "school" | "university"
        id: number
        name: string
    }
    online?: number
    personal?: {
        political?: number
        langs?: string[]
        religion?: string
        inspired_by?: string
        people_main?: string
        life_main?: string
        smoking?: number
        alcohol?: number
    }
    photo_50?: string
    photo_100?: string
    photo_200_orig?: string
    photo_400_orig?: string
    photo_id?: string
    photo_max?: string
    photo_max_orig?: string
    quotes?: string
    relatives?: {
        id?: number
        name?: string
        type?: "child" | "sibling" | "parent" | "grandparent" | "grandchild"
    }
    relation?: number
    schools?: {
        id?: number
        city?: number
        name?: number
        year_from?: number
        year_to?: number
        year_graduated?: number
        class?: string
        speciality?: string
        type?: number
        type_str?: string
    }[]
    screen_name?: string
    sex?: number
    site?: string
    status?: string
    timezone?: number
    trending?: number
    tv?: string
    universities?: {
        id?: number
        city?: number
        name?: string
        faculty?: number
        faculty_name?: string
        chair?: number
        chair_name?: string
        graduation?: number
        education_form?: string
        education_status?: string
    }[]
    verified?: number
    wall_comments?: "owner" | "all"
}