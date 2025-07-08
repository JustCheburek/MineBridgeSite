import { getAllContentMakers } from "@/services/user";
import Avatar from "@components/avatar";
import { GImg, GText, GLink } from "@components/grid";

export async function Streamers() {
    const contentMakersId = ["j8bsrsdgzqa4n0c", "8v4pdxujk92dgh5", "i5mqq2js4nos1yj"]
    const contentMakers = await getAllContentMakers()

    return (
        <GLink href='/features/streamers'>
            {contentMakersId.map(id => {
                const contentMaker = contentMakers.find(maker =>
                    maker._id === id
                )
                return (
                    <GImg imgs="three" key={id}>
                        <Avatar src={contentMaker?.photo || ''} className="size-32 !rounded-[50%]" />
                    </GImg>
                )
            })}

            <GText>Стримеры</GText>
        </GLink>
    )
}