import {Template} from "@email/template";

export const InviteEmail = async (
    {
        name,
        from,
        isContentMaker
    }: {
        name: string,
        from: { place: string, name: string },
        isContentMaker: boolean
    }
) => (
    <Template name={name}>
        <p>
            Вы позвали {from.name} ({from.place}), и мы дали тебе <strong>5 звёзд</strong>
        </p>
        {isContentMaker} && (
        <p>
            А ещё так как ты контент мейкер, ты ещё <strong>10 мостиков</strong> получил
        </p>
        )
    </Template>
)