// React
import Link from "next/link";

// Svg
import {MostikiSvg} from "@ui/svgs";

export function Account({price}) {
    const {data, isLoading, isError} = useMe()

    if (isLoading) {
        return (
            <p>Загрузка...</p>
        )
    }

    if (isError) {
        return (
            <Link href="/auth" className="red_color">
                Для покупки кейсов нужно создать / войти в аккаунт
            </Link>
        )
    }

    const {user} = data

    return (
        <>
            <h3><Link href={`/user/${user.name}`} className="unic_color">{user.name}</Link></h3>
            <p>
                Баланс: <span className={`mostiki_text ${user.mostiki >= price ? "green_color" : "red_color"}`}>
                    {user.mostiki} <MostikiSvg/>
                </span>
            </p>
            <p>
                Стоимость: <span className={`mostiki_text ${user.mostiki >= price ? "green_color" : "red_color"}`}>
                    {price} <MostikiSvg/>
                </span>
            </p>
        </>
    )
}

export function LeftContainer({selectedItem, price, items}) {
    return (
        <div className="left_container container center_text">
            <div className="info_case box" key={items[selectedItem]?.drop?.name}>
                <h3 className="text heading unic_color">
                    {items[selectedItem]?.drop?.displayname}
                </h3>
                <p className="text">
                    Редкость:<br/>
                    <span className={`changeable ${items[selectedItem]?.rarity?.name}`}>
                        {items[selectedItem]?.rarity?.displayname}
                    </span>
                </p>
                <p className={`text description ${items[selectedItem]?.rarity?.name}`}>
                    {items[selectedItem]?.type?.description}
                </p>
            </div>

            <div className="account box">
                <Account price={price}/>
            </div>
        </div>
    )
}