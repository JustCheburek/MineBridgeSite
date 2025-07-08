import { getAllContentMakers } from "@/services/user";
import Avatar from "@components/avatar";
import { GImg, GText, GLink } from "@components/grid";

export async function Streamers() {
    const contentMakersId = ["8v4pdxujk92dgh5", "j8bsrsdgzqa4n0c", "t2dhhl5igw1sp43"]
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