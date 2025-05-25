import {Box, Price, Section, Text} from "@components/shop";
import {Url} from "@components/button";
import {getCase, getDrop, getDrops} from "@/services/shop";
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

    return {
        title: `${Case.displayname} кейс • ${Drop.displayname}`,
        description: `Выберите дроп! ${Case.displayname} кейс (${Drop.displayname})!`
    }
}

export default async function DropsItems(
    {params}: ParamsProp
) {
    const {Case: CaseName, Drop: DropName} = await params
    if (DropName !== "all") {
        redirect(`/shop/drop/${CaseName}/${DropName}/${DropName}`)
    }

    const [Case, Drop, Drops] = await Promise.all([
        getCase({name: CaseName}),
        getDrop({name: DropName}),
        getDrops()
    ])

    return (
        <div>
            <H1 paths={[
                {displayname: "Магазин", name: "shop", hide: true},
                {displayname: "Дроп", name: "drop", hide: true},
                {displayname: `${Case.displayname} кейс`, name: Case.name},
                {displayname: Drop.displayname, name: Drop.name}
            ]}>
                Дроп предмета
            </H1>
            <Section type="third">
                {Drops
                    .filter(Drop => Drop.name !== "all")
                    .map(Drop => (
                        <Box key={Drop.name}>
                            <Text>
                                <h3>
                                    {Drop.displayname}
                                </h3>
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