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
import {AutoSvg, EditSvg, MostikiSvg, StarSvg} from "@ui/SVGS";
import {URLS_START} from "@/const";
import {NameParams} from "@/types/params";
import {Skeleton} from "@components/skeleton";

const Avatar = dynamic(() => import("@components/avatar"));
const ServerStatusSection = dynamic(() => import("./components/serverStatus"));
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
        user, roles, isMe, isContentMaker, isAdmin
    } = await getUser(
        {name}, true, true, author?._id, isHelper
    )

    if (author && (!author?.from)) {
        await userModel.findByIdAndUpdate(
            author._id,
            {from: await userModel.From(author)}
        )
    }

    return (
        <div className={styles.profile}>
            <div className={styles.container}>
                <Avatar src={user.photo}/>

                <div className={styles.text}>
                    <h2>
                        <span className="unic_color all_select">
                            {user.name}
                        </span>{" "}
                        {(isMe || isHelper) &&
                          <Link href={`/user/${user.name}/accounts`}>
                            <EditSvg size="0.6em" className="unic_color"/>
                          </Link>
                        }
                    </h2>

                    {isHelper &&
                      <small className="light_gray_color">
                        Айди: {" "}
                        <span className="all_select">{user._id}</span>
                      </small>
                    }
                    {isContentMaker &&
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
                    }
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
                        <Link href="/milkyway">
                            Звёзды: {" "}
                            <strong className="yellow_color">
                            {user.rating}
                            </strong> {" "}
                            <StarSvg/>
                        </Link>{" "}

                        {(isMe || isHelper) &&
                          <Link
                            href={isHelper
                                ? `/user/${user.name}/history`
                                : "/rules"
                            }
                            className="add"
                          >
                            +
                          </Link>
                        }
                    </h4>
                    <h4>
                        Мостики: {" "}
                        <strong className="unic_color">
                            {user.mostiki}
                        </strong> {" "}
                        <MostikiSvg/>{" "}
                        {(isMe || isAdmin) &&
                          <Link href={isAdmin
                              ? `/user/${user.name}/accounts`
                              : "/shop"
                          }
                                className="add">
                            +
                          </Link>
                        }
                    </h4>
                </div>
            </div>

            <Suspense fallback={<Skeleton width="100%" height={450}/>}>
                <ServerStatusSection
                    user={user}
                    isMe={isMe}
                />
            </Suspense>

            {isContentMaker &&
              <Suspense fallback={<Skeleton width="100%" height={307}/>}>
                <TwitchFrame user={user}/>
              </Suspense>
            }
        </div>
    )
}

