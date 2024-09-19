import {Box, CaseInfo, Section, Text} from "@components/shop";
import {Url} from "@components/button";
import {Case, Drop, RarityNames, rarityNames} from "@/types/case";
import {getDrop} from "@/services";
import {redirect} from "next/navigation";
import type {Metadata} from "next";

export const metadata: Metadata = {
    title: "Выбрать редкость",
    description: "Выберите редкость для продолжения просмотра дропа с этой редкостью!",
    openGraph: {
        title: "Выбрать редкость",
        description: "Выберите редкость для продолжения просмотра дропа с этой редкостью!",
    },
    twitter: {
        title: "Выбрать редкость",
        description: "Выберите редкость для продолжения просмотра дропа с этой редкостью!",
    }
};

export default async function Rarities(
    {
        params: {
            Case: CaseName,
            Drop: DropName,
            DropItem: DropItemName
        }
    }: {
        params: {
            Case: Case["name"],
            Drop: Drop["name"],
            DropItem: Drop["name"]
        }
    }) {
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