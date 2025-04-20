import type {Metadata} from "next";
import dynamic from "next/dynamic";
import Link from "next/link";
import {Suspense} from "react";
import TimeAgo from "javascript-time-ago";
import {validate} from "@services/validate";
import {getLastSeen, getUser, updateFrom} from "@/services";
import {Social} from "@/types/url";
import styles from "./profile.module.scss"
import {userModel} from "@server/models";
import {AutoSvg, EditSvg, MostikiSvg, StarSvg} from "@ui/SVGS";
import {URLS_START} from "@/const";
import type {NameParams} from "@/types/params";
import {Skeleton} from "@components/skeleton";
import type {User} from "lucia";
import {GiftBox} from "./components/gift";
import {cookies} from "next/headers";

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

const Mostiki = ({isMe, isAdmin, user, author}: {
    isMe: boolean,
    isAdmin: boolean,
    user: User,
    author: User | null
}) => {
    if ((!isMe || !isAdmin) && (author?.mostiki && author?.mostiki <= 0)) return

    return (<>
        {(isAdmin || isMe) &&
          <Link
            href={isMe
                ? "/shop"
                : `/user/${user.name}/accounts`
            }
            className="add"
          >
            +
          </Link>
        }

        {author &&
          <GiftBox user={user} author={author} isMe={isMe}/>
        }
    </>)
}

const timeAgo = new TimeAgo('ru-RU');

export default async function Profile({params}: NameParams) {
    const cookiesStore = await cookies()

    const {name} = await params
    const {user: author, isHelper, isAdmin, roles: authorRoles} = await validate()
    const {
        user, roles, isMe, isContentMaker
    } = await getUser(
        {name}, true, true, author?._id, isHelper
    )
    const lastSeen = await getLastSeen(user.name)

    if (author) {
        const from: { place: string, name: string } = JSON.parse(cookiesStore.get("from")?.value ?? "{}")

        await userModel.findByIdAndUpdate(
            author._id,
            {from: await updateFrom(author, from, authorRoles)}
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
                    <div>
                        <h4>
                            Онлайн:
                        </h4>
                        <p>
                            Сайт: {" "}
                            <time dateTime={new Date(user.onlineAt || 0).toISOString()}>
                                {timeAgo.format(new Date(user.onlineAt || 0))}
                            </time>
                        </p>
                        {lastSeen &&
                          <p>
                            Сервер: {" "}
                            <Suspense fallback={<Skeleton width={130} height="1em"/>}>
                              <time dateTime={new Date(lastSeen || 0).toISOString()}>
                                  {timeAgo.format(new Date(lastSeen || 0))}
                              </time>
                            </Suspense>
                          </p>
                        }
                    </div>
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
                    <div className={styles.mostiki_box}>
                        <h4>
                            Мостики: {" "}
                            <strong className="unic_color">
                                {user.mostiki}
                            </strong> {" "}
                            <MostikiSvg/>
                        </h4>{" "}

                        <Mostiki user={user} author={author} isMe={isMe} isAdmin={isAdmin}/>
                    </div>
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

