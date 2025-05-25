import {Box, Price, Section, Text} from "@components/shop";
import {Url} from "@components/button";
import {getCases, getDrops} from "@services/shop";
import type {Metadata} from "next";
import {H1} from "@components/h1";
import {CaseBoxWithModal} from "@components/caseBoxModal";

export const metadata: Metadata = {
    title: "Выберите кейс",
    description: "Выберите кейс для продолжения просмотра дропа с этого кейса!"
};

export default async function Cases() {
    const [Cases, Drops] = await Promise.all([getCases(), getDrops()])

    return (
        <div>
            <H1>Кейсы</H1>
            <Section type="third">
                {Cases.map(Case => (
                    <Box key={Case.name}>
                        <CaseBoxWithModal Case={Case} Drops={Drops}/>
                        <Text>
                            <h3>
                                {Case.displayname}
                            </h3>
                            <Price oldPrice={Case.oldPrice}>
                                {Case.price}
                            </Price>
                            <Url href={`/shop/drop/${Case.name}`} margin="10px">
                                Выбрать
                            </Url>
                        </Text>
                    </Box>
                ))}
            </Section>
        </div>
    )
}