import {Box, CaseInfo, Section, Text} from "@components/shop";
import {Url} from "@components/button";
import {Case, Drop, RarityNames, rarityNames} from "@/types/case";
import {getCase, getDrop} from "@/services";
import {redirect} from "next/navigation";
import type {Metadata} from "next";

type ParamsProp = {
    params: {
        Case: Case["name"]
        Drop: Drop["name"]
        DropItem: Drop["name"]
    }
}

export const generateMetadata = async (
    {
        params: {Case: CaseName, Drop: DropName, DropItem: DropItemName}
    }: ParamsProp
): Promise<Metadata> => {
    const [Case, Drop, DropItem] = await Promise.all([
        getCase({name: CaseName}),
        getDrop({name: DropName}),
        getDrop({name: DropItemName})
    ])

    let DropTitle = DropItem.displayname
    if (Drop.displayname !== DropItem.displayname) {
        DropTitle += ` (${Drop.displayname})`
    }

    const title = `${Case.displayname} кейс • ${DropTitle}`
    const description = `Выберите редкость дропа: ${DropTitle}! ${Case.displayname} кейс.`

    return {
        title, description,
        openGraph: {title, description},
        twitter: {title, description}
    }
}

export default async function Rarities(
    {
        params: {
            Case: CaseName,
            Drop: DropName,
            DropItem: DropItemName
        }
    }: ParamsProp) {
    const DropItem = await getDrop({name: DropItemName})

    if (DropItem.defaultRarity) {
        return redirect(`/shop/drop/${CaseName}/${DropName}/${DropItemName}/${DropItem.defaultRarity}`)
    }

    return (
        <div>
            <Section name="cases">
                {rarityNames.map(rarity => (
                    <Box key={rarity}>
                        <Text>
                            <CaseInfo>
                                {RarityNames[rarity]}
                            </CaseInfo>
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