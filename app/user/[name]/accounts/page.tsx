// Сервер
import type {PropsWithChildren} from "react";
import {validate} from "@services/validate"
import {getUser} from "@/services";

// Стили
import styles from "./accounts.module.scss"

// Компоненты
import {AutoSvg, SuccessSvg} from "@ui/SVGS";
import {ChangeParam, DeleteUserBox} from "./components";
import {User} from "lucia";
import {H1} from "@components/h1";
import {CheckLink} from "@components/checkLink";
import {NameParams} from "@/types/params";

export const generateMetadata = async ({params}: NameParams) => {
    const {name} = await params

    return {
        title: `${name} > Аккаунты`,
        description: `Привязанные интеграции ${name}! (супер секретно)`
    }
}

const providers = {
    email: "email",
    discord: "discordId",
    google: "googleId"
}
type providerName = keyof typeof providers
const providersNames = Object.keys(providers) as providerName[]

export default async function Accounts({params}: NameParams) {
    const {name} = await params
    const {
        user: author,
        isModer, isAdmin, isHelper
    } = await validate()
    const {
        user, isMe, isContentMakerCheck
    } = await getUser(
        {name}, true, true, author?._id, isHelper
    )

    const moderAccess = isModer || isMe

    return (
        <div className="account_content">
            <H1 up className={styles.for_bigger}>
                Аккаунты
            </H1>
            <H1 className={styles.for_smaller}>
                Акки
            </H1>

            {(isMe || isHelper) &&
              <ChangeParam
                user={user} isMe={isMe}
                isHelper={isHelper} isAdmin={isAdmin}
                isContentMaker={isContentMakerCheck}
              />
            }

            <div className={styles.providers_box}>
                {providersNames.map(id => (
                    <Provider
                        // @ts-ignore
                        id={user[providers[id]]}
                        name={id}
                        key={id}
                        user={user}
                        isMe={isMe}
                    >
                        <AutoSvg
                            type={id}
                            size="1.5em"
                            className={`color ${id === "discord" ? styles.ds : ""}`}
                        />
                    </Provider>
                ))}
            </div>
            {moderAccess &&
              <DeleteUserBox user={user} isModer={isModer}/>
            }
        </div>
    )
}

type Provider = {
    name: providerName
    isMe: boolean
    user: User
    id?: string
}

function Provider({id, user, name, isMe, children}: PropsWithChildren<Provider>) {
    if (!id && !isMe) {
        return null
    }

    return (
        <CheckLink href={name === "email" ? undefined : `/auth/${name}?name=${user.name}`}>
            <div className={styles.box}>
                {children}
                {id
                    ? <>
                        <p className={`all_select medium-font center_text ${styles.id}`}>
                            {id}
                        </p>
                        <SuccessSvg size="1.5em"/>
                    </>
                    : <span className="unic_color medium-font">
							Привязать
						</span>
                }
            </div>
        </CheckLink>
    )
}