import {useParams} from "react-router-dom";
import {useGetUser} from "../../hooks/userQueries";
import {Loading} from "@components/loading";
import {Helmet} from "react-helmet";
import {SubsectionItem, Subsections} from "@components/subsections";
import {PunishmentSection} from "./components/punishment_section";
import {CasesPurchasesSection} from "./components/cases_purchases_section";

import "./styles/history.scss"
import { MaxSize } from "@ui/components/maxSize";

export function Component() {
    const {name} = useParams()

    const {
        isLoading,
        isError,
        error,
        data
    } = useGetUser(name)

    // Загрузка
    if (isLoading) {
        return <Loading/>
    }

    // Ошибка
    if (isError) {
        throw error
    }

    const {user} = data

    const person = {
        "@context": "https://schema.org",
        "@type": "ProfilePage",
        "name": user.name,
        "image": user.image,
        "description": `История рейтинга, всяких покупок игрока ${user.name}!`,
        "url": `https://minebridge.site/user/${user.name}/history`
    }

    return (
        <main className="history">
            <MaxSize>
                <Helmet>
                    <title>{user.name} > Истории действий | Майнбридж</title>
                    <meta
                        charSet="UTF-8"
                        content={`История рейтинга, всяких покупок игрока ${user.name}!`}
                        name="description"
                    />

                    <script type="application/ld+json">{JSON.stringify(person)}</script>
                </Helmet>

                <Subsections menu="Меню профиля">
                    <SubsectionItem href={`/user/${user.name}`}>
                        Профиль
                    </SubsectionItem>
                    <SubsectionItem href={`/user/${user.name}/history`}>
                        История
                    </SubsectionItem>
                    <SubsectionItem href={`/user/${user.name}/accounts`}>
                        Аккаунты
                    </SubsectionItem>
                </Subsections>

                <div className="integration_content">
                    <h1>История</h1>

                    {user.punishments?.length > 0 &&
                        <PunishmentSection/>
                    }

                    {user.casesPurchases?.length > 0 &&
                        <CasesPurchasesSection/>
                    }
                </div>
            </MaxSize>
        </main>
    )
}