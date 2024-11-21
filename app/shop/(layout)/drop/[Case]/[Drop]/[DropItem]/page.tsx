import {Box, CaseInfo, Section, Text} from "@components/shop";
import {Url} from "@components/button";
import {Case, Drop, RarityNames, rarityNames} from "@/types/case";
import {getCase, getDrop} from "@/services";
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
    const DropItem = await getDrop({name: DropItemName})

    if (DropItem.defaultRarity) {
        return redirect(`/shop/drop/${CaseName}/${DropName}/${DropItemName}/${DropItem.defaultRarity}`)
    }

    return (
        <div>
            <H1>Редкость</H1>
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