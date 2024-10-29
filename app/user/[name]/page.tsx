import type {Metadata} from "next";
import {validate} from "@services/validate";
import {getUser} from "@/services";
import Link from "next/link";
import {cookies} from "next/headers";
import {lucia} from "@server/lucia";
import {Social} from "@/types/url";
import styles from "./profile.module.scss"
import {Avatar} from "./components/avatar";
import {WhitelistSection} from "./components/whitelist";
import {FormBox} from "./components/form";
import {userModel} from "@server/models";
import {ColorText} from "@app/utils";
import {MostikiSvg} from "@ui/SVGS";
import {URLS_START} from "@/const";
import {SocialBox} from "./components/social";
import {User} from "lucia";
import {NameParams} from "@/types/params";
import {Skeleton} from "@components/skeleton";
import {Suspense} from "react";

export const experimental_ppr = true

export const generateMetadata = async ({params}: NameParams): Promise<Metadata> => {
    const {name} = await params

    return {
        title: `${name}`,
        description: `Игрок ${name} играет на Майнбридж, а ты так не можешь что ли?`,
        openGraph: {
            title: `${name}`,
            description: `Игрок ${name} играет на Майнбридж, а ты так не можешь что ли?`,
        },
        twitter: {
            title: `${name}`,
            description: `Игрок ${name} играет на Майнбридж, а ты так не можешь что ли?`,
        }
    }
}

export default async function Profile({params}: NameParams) {
    const {name} = await params
    const cookiesStore = await cookies()
    const {user: author, isModer, isAdmin} = await validate(cookiesStore.get(lucia.sessionCookieName)?.value)
    const {
        user, roles, isMe, isContentMaker
    } = await getUser(
        {name}, true, true, author?._id, isModer
    )

    if (author && (!author?.from || !author.from?.place || !author.from?.userId)) {
        await userModel.findByIdAndUpdate(
            author._id,
            {from: await userModel.From(author)}
        )
    }

    // todo: скины-аватарки?
    return (
        <div className={styles.profile}>
            <FormBox author={author}/>

            <div className={styles.container}>
                <Suspense fallback={<Skeleton width={180}/>}>
                    <Avatar photo={user.photo}/>
                </Suspense>

                <div className={styles.text}>
                    <Suspense fallback={<Skeleton width={400} height={60}/>}>
                        <h2 className="unic_color all_select">
                            {user.name}
                        </h2>
                        {isAdmin &&
                          <small className="light_gray_color">Айди: <span
                            className="all_select">{user._id}</span></small>
                        }
                    </Suspense>
                    <Suspense fallback={<Skeleton width={200} height={46}/>}>
                        <div className={styles.social}>
                            {user?.socials?.map((
                                {
                                    social,
                                    url,
                                    name,
                                    clicked
                                }: Social
                            ) => {
                                if (!social || (!url && !name)) return

                                url = url || `${URLS_START[social]}${name}`

                                return (
                                    <SocialBox
                                        social={social} key={social}
                                        isMe={isMe} isModer={isModer} _id={user._id}
                                        url={url} clicked={clicked}
                                    />
                                )
                            })}
                        </div>
                    </Suspense>
                    <Suspense fallback={<Skeleton width={500} height={90}/>}>
                        <div className={styles.roles}>
                            {roles.map(role => {
                                const color = `#${role.color.toString(16)}`
                                return (
                                    <small key={role.id} style={{color}}>
                                        {role.name}
                                    </small>
                                )
                            })}
                        </div>
                    </Suspense>
                    <h4>
                        Мостики: {" "}
                        <Suspense fallback={<Skeleton width={10} height={29.6}/>}>
                            <strong className={ColorText(user.mostiki)}>
                                {user.mostiki}
                            </strong>
                        </Suspense>
                        {" "}<MostikiSvg/>{" "}
                        <Link href="/shop" className="add">+</Link>
                    </h4>
                    <h4>
                        Соц рейтинг: {" "}
                        <Suspense fallback={<Skeleton width={10} height={29.6}/>}>
                            <strong className={ColorText(user.rating)}>
                                {user.rating}
                            </strong>
                        </Suspense>
                    </h4>
                </div>
            </div>

            <Suspense fallback={<Skeleton width={655} height={244}/>}>
                <WhitelistSection user={user} isMe={isMe} isModer={isModer}/>
            </Suspense>

            <Suspense fallback={<Skeleton width={655} height={360}/>}>
                <TwitchFrame user={user} isContentMaker={isContentMaker}/>
            </Suspense>
        </div>
    )
}

function TwitchFrame({isContentMaker, user}: { isContentMaker: boolean, user: User }) {
    if (!isContentMaker) return

    const twitchName = user?.socials?.find(({social}) => social === "twitch")?.name
    if (!twitchName) return

    return (
        <iframe
            src={`https://player.twitch.tv/?channel=${twitchName}&parent=${process.env.NEXT_PUBLIC_RU_DOMAIN}`}
            allowFullScreen
            frameBorder={0}
        />
    )
}