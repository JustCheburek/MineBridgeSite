import {Box, CaseInfo, Price, Section, Text} from "@components/shop";
import {Url} from "@components/button";
import {getCase, getDrop, getDrops} from "@/services";
import {Case, Drop} from "@/types/case";
import {redirect} from "next/navigation";
import type {Metadata} from "next";

type ParamsProp = {
    params: {
        Case: Case["name"],
        Drop: Drop["name"]
    }
}

export const generateMetadata = async ({params: {Case: CaseName, Drop: DropName}}: ParamsProp): Promise<Metadata> => {
    const Case = await getCase({name: CaseName})
    const Drop = await getDrop({name: DropName})

    const title = `${Case.displayname} кейс • Дроп: ${Drop.displayname}`
    const description = `Выберите дроп с кейса ${Case.displayname} (${Drop.displayname})!`

    return {
        title, description,
        openGraph: {title, description},
        twitter: {title, description}
    }
}

export default async function DropsItems(
    {
        params: {
            Case: CaseName,
            Drop: DropName
        }
    }: ParamsProp) {
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