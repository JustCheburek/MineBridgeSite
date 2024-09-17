import {Box, CaseInfo, Section, Text} from "@components/shop";
import {Url} from "@components/button";
import {Case, Drop, RarityType} from "@/types/case";
import {getDrop} from "@/services";
import {H1} from "@components/h1";
import {Img, ImgBox} from "@components/img";

export default async function Items(
    {
        params: {
            Case: CaseName,
            Drop: DropName,
            DropItem: DropItemName,
            rarity
        }
    }: {
        params: {
            Case: Case["name"],
            Drop: Drop["name"],
            DropItem: Drop["name"],
            rarity: RarityType
        }
    }) {
    const DropItem = await getDrop({name: DropItemName})

    // Items
    let {drop: items} = DropItem
    if (items?.length === 0) {
        items = DropItem[rarity]
    }
    if (items?.length === 0 || !items) {
        return (
            <div>
                <H1>
                    Нет Items!
                </H1>
                <p>
                    {JSON.stringify(DropItem)}
                </p>
            </div>
        )
    }

    return (
        <div>
            <Section name="cases">
                {items.map(Item => (
                    <Box key={Item.name}>
                        <ImgBox className={`border-radius ${rarity}_box`} hover width="280px" height="160px">
                            <Img
                                src={`/shop/${DropItem.name}/${Item.name}.webp`} alt={Item.displayname}
                            />
                        </ImgBox>
                        <Text>
                            <CaseInfo>
                                {Item.displayname}
                            </CaseInfo>
                            <Url href={`/shop/drop/${CaseName}/${DropName}/${DropItemName}/${rarity}/${Item.name}`} margin="10px">
                                Выбрать
                            </Url>
                        </Text>
                    </Box>
                ))}
            </Section>
        </div>
    )
}