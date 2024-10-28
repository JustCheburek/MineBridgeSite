import {Box, CaseInfo, Price, Section, Text} from "@components/shop";
import {Url} from "@components/button";
import {getCase, getDrop, getDrops} from "@/services";
import {Case, Drop} from "@/types/case";
import {redirect} from "next/navigation";
import type {Metadata} from "next";
import {H1} from "@components/h1";

type ParamsProp = {
    params: Promise<{
        Case: Case["name"]
        Drop: Drop["name"]
    }>
}

export const generateMetadata = async (
    {params}: ParamsProp
): Promise<Metadata> => {
    const {Case: CaseName, Drop: DropName} = await params
    const [Case, Drop] = await Promise.all([
        getCase({name: CaseName}),
        getDrop({name: DropName})
    ])

    const title = `${Case.displayname} кейс • ${Drop.displayname}`
    const description = `Выберите дроп! ${Case.displayname} кейс (${Drop.displayname})!` // весь дроп

    return {
        title, description,
        openGraph: {title, description},
        twitter: {title, description}
    }
}

export default async function DropsItems(
    {params}: ParamsProp
) {
    const {Case: CaseName, Drop: DropName} = await params
    if (DropName !== "all") {
        redirect(`/shop/drop/${CaseName}/${DropName}/${DropName}`)
    }

    const drops = await getDrops()

    return (
        <div>
            <H1>Дроп предмета</H1>
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