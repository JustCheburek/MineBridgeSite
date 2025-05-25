import {Box, Section, Text} from "@components/shop";
import {Url} from "@components/button";
import {Case, Drop, RarityNames, rarityNames} from "@/types/case";
import {getCase, getDrop} from "@services/shop";
import {redirect} from "next/navigation";
import type {Metadata} from "next";
import {H1} from "@components/h1";

type ParamsProp = {
    params: Promise<{
        Case: Case["name"]
        Drop: Drop["name"]
        DropItem: Drop["name"]
    }>
}

export const generateMetadata = async (
    {params}: ParamsProp
): Promise<Metadata> => {
    const {Case: CaseName, Drop: DropName, DropItem: DropItemName} = await params
    const [Case, Drop, DropItem] = await Promise.all([
        getCase({name: CaseName}),
        getDrop({name: DropName}),
        getDrop({name: DropItemName})
    ])

    let DropTitle = DropItem.displayname
    if (Drop.displayname !== DropItem.displayname) {
        DropTitle += ` (${Drop.displayname})`
    }

    return {
        title: `${Case.displayname} кейс • ${DropTitle}`,
        description: `Выберите редкость дропа: ${DropTitle}! ${Case.displayname} кейс.`
    }
}

export default async function Rarities(
    {params}: ParamsProp
) {
    const {Case: CaseName, Drop: DropName, DropItem: DropItemName} = await params
    const [Case, Drop, DropItem] = await Promise.all([
        getCase({name: CaseName}),
        getDrop({name: DropName}),
        getDrop({name: DropItemName})
    ])

    if (DropItem.defaultRarity) {
        return redirect(`/shop/drop/${CaseName}/${DropName}/${DropItemName}/${DropItem.defaultRarity}`)
    }

    return (
        <div>
            <H1 paths={[
                {displayname: "Магазин", name: "shop", hide: true},
                {displayname: "Дроп", name: "drop", hide: true},
                {displayname: `${Case.displayname} кейс`, name: Case.name},
                {displayname: Drop.displayname, name: Drop.name},
                {displayname: DropItem.displayname, name: DropItem.name}
            ]}>
                Редкость
            </H1>
            <Section type="third">
                {rarityNames.map(rarity => (
                    <Box key={rarity}>
                        <Text>
                            <h3>
                                {RarityNames[rarity]}
                            </h3>
                            <Url href={`/shop/drop/${CaseName}/${DropName}/${DropItemName}/${rarity}`} margin="10px">
                                Выбрать
                            </Url>
                        </Text>
                    </Box>
                ))}
            </Section>
        </div>
    )
}