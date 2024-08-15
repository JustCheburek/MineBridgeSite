import {PBox, PText, PTitle} from "@components/post";
import {User} from "lucia";
import {UserBox} from "@components/userBox";
import styles from "./analytics.module.scss";

// мс * с * мин * ч * д
const day = 1000 * 60 * 60 * 24
const week = day * 7
const month = day * 30

export function Online({users}: { users: User[] }) {
    const total = users.length

    const atDay = users.filter(user => {
        if (!user.onlineAt) return false
        const time = new Date().getTime() - new Date(user.onlineAt).getTime()
        return time < day
    }).length
    const atWeek = users.filter(user => {
        if (!user.onlineAt) return false
        const time = new Date().getTime() - new Date(user.onlineAt).getTime()
        return time < week
    }).length
    const atMonth = users.filter(user => {
        if (!user.onlineAt) return false
        const time = new Date().getTime() - new Date(user.onlineAt).getTime()
        return time < month
    }).length

    return (
        <PBox>
            <PTitle>
                <h2>Онлайн</h2>
            </PTitle>
            <PText>
                <h4>Всего: <span className="unic_color medium-font">{total}</span></h4>
                <h4><span className="unic_color medium-font">{atDay}</span> за сегодня</h4>
                <h4><span className="unic_color medium-font">{atWeek}</span> за неделю</h4>
                <h4><span className="unic_color medium-font">{atMonth}</span> за месяц</h4>
            </PText>
        </PBox>
    )
}

export function Invites({users}: { users: User[] }) {
    const total = users.reduce((all, {invites}) => all + (invites?.length || 0), 0)

    const top5 = users
        .sort((a, b) => (b.invites?.length || 0) - (a.invites?.length || 0))
        .slice(0, 5)

    return (
        <PBox>
            <PTitle>
                <h2>Приглашения</h2>
            </PTitle>
            <PText>
                <h4>Всего: <span className="unic_color medium-font">{total}</span></h4>
                <h4>Топ 5 пригласителей</h4>
                {top5.map(user => (
                    <div key={user._id}>
                        <UserBox key={user._id} _id={user._id}>
                            <strong className={`unic_color ${styles.number}`}>{user.invites?.length || 0}</strong>
                        </UserBox>
                    </div>
                ))}
            </PText>
        </PBox>
    )
}