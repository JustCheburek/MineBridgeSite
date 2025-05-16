import {Box, Price, Section, Text} from "@components/shop";
import {Url} from "@components/button";
import {getCase, getDrops} from "@/services";
import {Case} from "@/types/case";
import type {Metadata} from "next";
import {H1} from "@components/h1";

type ParamsProp = {
    params: Promise<{
        Case: Case["name"]
    }>
}

export const generateMetadata = async (
    {params}: ParamsProp
): Promise<Metadata> => {
    const {Case: CaseName} = await params
    const Case = await getCase({name: CaseName})

    return {
        title: `${Case.displayname} кейс`,
        description: `Выберите дроп! ${Case.displayname} кейс.`
    }
}

export default async function Drops(
    {params}: ParamsProp
) {
    const {Case: CaseName} = await params
    const [Case, Drops] = await Promise.all([
        getCase({name: CaseName}),
        getDrops()
    ])

    return (
        <div>
            <H1 paths={[
                {displayname: "Магазин", name: "shop", hide: true},
                {displayname: "Дроп", name: "drop", hide: true},
                {displayname: `${Case.displayname} кейс`, name: Case.name}
            ]}>
                Дроп кейса
            </H1>
            <Section type="third">
                {Drops.map(Drop => (
                    <Box key={Drop.name}>
                        <Text>
                            <h3>
                                {Drop.displayname}
                            </h3>
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