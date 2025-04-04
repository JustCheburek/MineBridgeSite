import {PBox, PText, PTitle} from "@components/post";
import type {User} from "lucia";
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

export function New({users}: { users: User[] }) {
    const atDay = users.filter(user => {
        if (!user.createdAt) return false
        const time = new Date().getTime() - new Date(user.createdAt).getTime()
        return time < day
    }).length
    const atWeek = users.filter(user => {
        if (!user.createdAt) return false
        const time = new Date().getTime() - new Date(user.createdAt).getTime()
        return time < week
    }).length
    const atMonth = users.filter(user => {
        if (!user.createdAt) return false
        const time = new Date().getTime() - new Date(user.createdAt).getTime()
        return time < month
    }).length

    return (
        <PBox>
            <PTitle>
                <h2>Новички</h2>
            </PTitle>
            <PText>
                <h4><span className="unic_color medium-font">{atDay}</span> за сегодня</h4>
                <h4><span className="unic_color medium-font">{atWeek}</span> за неделю</h4>
                <h4><span className="unic_color medium-font">{atMonth}</span> за месяц</h4>
            </PText>
        </PBox>
    )
}

export function Invites({users}: { users: User[] }) {
    const total = users.reduce((all, {invites}) => all + (invites?.length || 0), 0)

    const max = 5
    const topInvites = users
        .sort((a, b) => (b.invites?.length || 0) - (a.invites?.length || 0))
        .slice(0, max)

    return (
        <PBox>
            <PTitle>
                <h2>Приглашения</h2>
            </PTitle>
            <PText>
                <h4>Всего: <span className="unic_color medium-font">{total}</span></h4>
                <h4>Топ {topInvites.length} пригласителей</h4>
                {topInvites.map(user => (
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

export function Places({users}: { users: User[] }) {
    const places: { [key: string]: number } = {}

    users.forEach(user => {
        const place = user.from?.place

        if (place) {
            places[place] = (places[place] || 0) + 1
        }
    })

    const topPlaces = Object.entries(places)
        .map(([place, count]) => ({place, count}))
        .sort((a, b) => b.count - a.count)

    return (
        <PBox>
            <PTitle>
                <h2>Места</h2>
            </PTitle>
            <PText>
                <h4>Всего: <span className="unic_color medium-font">{topPlaces.length}</span></h4>
                <h4>Топ {topPlaces.length} мест:</h4>
                {topPlaces.map(({place, count}) => (
                    <div key={place} className={styles.place}>
                        <p className="medium-font unic_color">{place}</p>
                        <p className="green_color medium-font">{count}</p>
                    </div>
                ))}
            </PText>
        </PBox>
    )
}