import {Box, CaseInfo, Price, Section, Text} from "@components/shop";
import {Url} from "@components/button";
import {getCase, getDrops} from "@/services";
import {Case} from "@/types/case";
import type {Metadata} from "next";
import {redirect} from "next/navigation";

type ParamsProp = {
    params: {
        Case: Case["name"]
    }
}

export const generateMetadata = async (
    {
        params: {Case: CaseName}
    }: ParamsProp
): Promise<Metadata> => {
    const Case = await getCase({name: CaseName})

    const title = `${Case.displayname} кейс`
    const description = `Выберите дроп! ${Case.displayname} кейс.`

    return {
        title, description,
        openGraph: {title, description},
        twitter: {title, description}
    }
}

export default async function Drops(
    {
        params: {
            Case: CaseName,
        }
    }: ParamsProp) {
    const drops = await getDrops()

    return (
        <div>
            <Section name="cases">
                {drops.map(Drop => (
                    <Box key={Drop.name}>
                        <Text>
                            <CaseInfo>
                                {Drop.displayname}
                            </CaseInfo>
                            <Price>
                                {Drop.price}
                            </Price>
                            <Url href={`/shop/drop/${CaseName}/${Drop.name}`} margin="10px">
                                Выбрать
                            </Url>
                        </Text>
                    </Box>
                ))}
            </Section>
        </div>
    )
}