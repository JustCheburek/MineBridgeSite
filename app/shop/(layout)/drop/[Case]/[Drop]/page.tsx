import {Box, CaseInfo, Price, Section, Text} from "@components/shop";
import {Url} from "@components/button";
import {getDrops} from "@/services";
import {Case, Drop} from "@/types/case";
import {redirect} from "next/navigation";
import type {Metadata} from "next";

export const metadata: Metadata = {
    title: "Выбрать дроп",
    description: "Выберите дроп для продолжения просмотра дропа с этого дропа!",
    openGraph: {
        title: "Выбрать дроп",
        description: "Выберите дроп для продолжения просмотра дропа с этого дропа!",
    },
    twitter: {
        title: "Выбрать дроп",
        description: "Выберите дроп для продолжения просмотра дропа с этого дропа!",
    }
};

export default async function DropsItems(
    {
        params: {
            Case: CaseName,
            Drop: DropName
        }
    }: {
        params: {
            Case: Case["name"],
            Drop: Drop["name"]
        }
    }) {
    if (DropName !== "all") {
        redirect(`/shop/drop/${CaseName}/${DropName}/${DropName}`)
    }

    const drops = await getDrops()

    return (
        <div>
            <Section name="cases">
                {drops
                    .filter(Drop => Drop.name !== "all")
                    .map(Drop => (
                    <Box key={Drop.name}>
                        <Text>
                            <CaseInfo>
                                {Drop.displayname}
                            </CaseInfo>
                            <Price>
                                {Drop.price}
                            </Price>
                            <Url href={`/shop/drop/${CaseName}/${DropName}/${Drop.name}`} margin="10px">
                                Выбрать
                            </Url>
                        </Text>
                    </Box>
                ))}
            </Section>
        </div>
    )
}