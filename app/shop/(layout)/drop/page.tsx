import {Box, CaseBox, CaseInfo, Price, Section, Text} from "@components/shop";
import {Url} from "@components/button";
import {getCases} from "@/services";
import type {Metadata} from "next";
import {H1} from "@components/h1";

export const metadata: Metadata = {
    title: "Выберите кейс",
    description: "Выберите кейс для продолжения просмотра дропа с этого кейса!"
};

export default async function Cases() {
    const Cases = await getCases()

    return (
        <div>
            <H1>Кейсы</H1>
            <Section name="cases">
                {Cases.map(Case => (
                    <Box key={Case.name}>
                        <CaseBox Case={Case}/>
                        <Text>
                            <CaseInfo>
                                {Case.displayname}
                            </CaseInfo>
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