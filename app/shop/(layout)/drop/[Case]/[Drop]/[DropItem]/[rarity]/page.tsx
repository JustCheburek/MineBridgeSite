import {Box, CaseInfo, Section, Text} from "@components/shop";
import {Url} from "@components/button";
import {Case, Drop, RarityNames, RarityType} from "@/types/case";
import {getCase, getDrop} from "@/services";
import {H1} from "@components/h1";
import {Img, ImgBox} from "@components/img";
import type {Metadata} from "next";
import {redirect} from "next/navigation";

type ParamsProp = {
    params: {
        Case: Case["name"]
        Drop: Drop["name"]
        DropItem: Drop["name"]
        rarity: RarityType
    }
}

export const generateMetadata = async (
    {
        params: {Case: CaseName, Drop: DropName, DropItem: DropItemName, rarity}
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

    const title = `${Case.displayname} кейс • ${RarityNames[rarity]} дроп: ${DropTitle}`
    const description = `Выберите предмет! ${RarityNames[rarity]} дроп: ${DropTitle}. ${Case.displayname} кейс.`

    return {
        title, description,
        openGraph: {title, description},
        twitter: {title, description}
    }
}

export default async function Items(
    {
        params: {
            Case: CaseName,
            Drop: DropName,
            DropItem: DropItemName,
            rarity
        }
    }: ParamsProp) {
    const DropItem = await getDrop({name: DropItemName})

    // Items
    let {drop: items} = DropItem
    if (items?.length === 0) {
        items = DropItem[rarity]
    }
    if (items?.length === 0 || !items) {
        redirect(`/shop/drop/${CaseName}/${DropName}/${DropItemName}`)
    }

    return (
        <div>
            <Section name="cases">
                {items.map(Item => (
                    <Box key={Item.name}>
                        <ImgBox className={`border-radius ${rarity}_box`} hover width="280px" height="160px">
                            <Img
                                src={`/shop/${DropItem.name}/${Item.name}.webp`} alt={Item.displayname}
                            />
                        </ImgBox>
                        <Text>
                            <CaseInfo>
                                {Item.displayname}
                            </CaseInfo>
                            <Url href={`/shop/drop/${CaseName}/${DropName}/${DropItemName}/${rarity}/${Item.name}`} margin="10px">
                                Выбрать
                            </Url>
                        </Text>
                    </Box>
                ))}
            </Section>
        </div>
    )
}