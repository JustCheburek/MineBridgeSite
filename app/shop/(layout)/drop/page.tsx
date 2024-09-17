import {Box, CaseBox, CaseInfo, Price, Section, Text} from "@components/shop";
import {Url} from "@components/button";
import {getCases} from "@/services";

export default async function Cases() {
    const Cases = await getCases()

    return (
        <div>
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