import type {User} from "lucia";
import {UserBox} from "@components/userBox";
import styles from "../profile.module.scss";
import {InviteLink} from "./inviteLink";

type InviteSection = {
    user: User, isMe: boolean, isModer: boolean
}

export function InviteSection({user, isMe, isModer}: InviteSection) {
    const invites = user.invites.slice(user.invites.length - 10)

    return (
        <section className="grid_center">
            <h2 className="center_text">Приглашения</h2>
            <h3 className="center_text">1 приглашение = 5 рейтинга</h3>
            {isMe &&
              <InviteLink name={user.name}/>
            }
            <FromBox user={user} isMe={isMe} isModer={isModer}/>
            <h4>Приглашений: <strong className="unic_color">{user.invites.length}</strong></h4>
            <p>Последние 10:</p>
            {invites.map(userId => (
                <UserBox key={userId} _id={userId}/>
            ))}
        </section>
    )
}

function FromBox({user, isMe, isModer}: { user: User, isMe: boolean, isModer: boolean }) {
    if (!user?.from || !user.from?.userId || !user.from?.place) return

    return (
        <div className={styles.from}>
            <p>
                {isMe
                    ? "Вы пришли"
                    : "Пришёл"
                } от
            </p>
            <UserBox _id={user.from.userId}/>
            {isModer &&
              <p className="unic_color">{user.from.place}</p>
            }
        </div>
    )
}