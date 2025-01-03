import type {Metadata} from "next";
import dynamic from "next/dynamic";
import Link from "next/link";
import {Suspense} from "react";
import TimeAgo from "javascript-time-ago";

import {validate} from "@services/validate";
import {getUser} from "@/services";
import {Social} from "@/types/url";
import styles from "./profile.module.scss"
import {userModel} from "@server/models";
import {AutoSvg, MostikiSvg, StarsSvg} from "@ui/SVGS";
import {URLS_START} from "@/const";
import {NameParams} from "@/types/params";
import {Skeleton} from "@components/skeleton";

const Avatar = dynamic(() => import("./components/avatar"));
const HourStarSection = dynamic(() => import("./components/hourstar"));
const WhitelistSection = dynamic(() => import("./components/whitelist"));
const TwitchFrame = dynamic(() => import("./components/twitch"));

export const generateMetadata = async (
    {
        params
    }: NameParams
): Promise<Metadata> => {
    const {name} = await params

    return {
        title: name,
        description: `${name} играет на Майнбридж, а ты?)`
    }
}

const timeAgo = new TimeAgo('ru-RU');

export default async function Profile({params}: NameParams) {
    const {name} = await params
    const {user: author, isHelper} = await validate()
    const {
        user, roles, isMe, isContentMaker
    } = await getUser(
        {name}, true, true, author?._id, isHelper
    )

    if (author && (!author?.from || !author.from?.place || !author.from?.userId)) {
        await userModel.findByIdAndUpdate(
            author._id,
            {from: await userModel.From(author)}
        )
    }

    return (
        <div className={styles.profile}>
            <div className={styles.container}>
                <Avatar photo={user.photo}/>

                <div className={styles.text}>
                    <h2 className="unic_color all_select">
                        {user.name}
                    </h2>
                    {isHelper &&
                      <small className="light_gray_color">
                        Айди: {" "}
                        <span className="all_select">{user._id}</span>
                      </small>
                    }
                    <div className={styles.social}>
                        {user?.socials?.map((
                            {
                                social,
                                url,
                                name
                            }: Social
                        ) => {
                            if (!social || (!url && !name)) return

                            url = url || `${URLS_START[social]}${name}`

                            return (
                                <Link
                                    href={url}
                                    target="_blank"
                                    title={social}
                                    key={social}
                                >
                                    <AutoSvg size="38px" type={social}/>
                                </Link>
                            )
                        })}
                    </div>
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
                    <h4>
                        Онлайн: {" "}
                        <time dateTime={new Date(user.onlineAt || 0).toISOString()}>
                            {timeAgo.format(new Date(user.onlineAt || 0))}
                        </time>
                    </h4>
                    <h4>
                        Звёзды: {" "}
                        <strong className="yellow_color">
                            {user.rating}
                        </strong> {" "}
                        <StarsSvg/>{" "}
                        <Link href="/rules" className="add">+</Link>
                    </h4>
                    <h4>
                        Мостики: {" "}
                        <strong className="unic_color">
                            {user.mostiki}
                        </strong> {" "}
                        <MostikiSvg/>{" "}
                        <Link href="/shop" className="add">+</Link>
                    </h4>
                </div>
            </div>

            {isMe && user.whitelist &&
              <Suspense fallback={<Skeleton width="100%" height={100}/>}>
                <HourStarSection user={user}/>
              </Suspense>
            }

            <WhitelistSection user={user} isMe={isMe} isHelper={isHelper}/>

            {isContentMaker &&
              <Suspense fallback={<Skeleton width="100%" height={307}/>}>
                <TwitchFrame user={user}/>
              </Suspense>
            }
        </div>
    )
}

