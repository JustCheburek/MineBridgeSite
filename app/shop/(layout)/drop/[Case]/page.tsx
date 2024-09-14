import {Box, CaseInfo, Price, Section, Text} from "@components/shop";
import {Url} from "@components/button";
import {getDrops} from "@/services";
import {Case} from "@/types/case";

export default async function Drops(
    {
        params: {
            Case: CaseName,
        }
    }: {
        params: {
            Case: Case["name"]
        }
    }) {
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