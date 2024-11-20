import {MaxSize} from "@components/maxSize";
import {H1} from "@components/h1";
import {GBox, GContainer, GText} from "@components/grid";

export default async function AdminPanel() {
    return (
        <MaxSize className="center_text grid_center">
            <H1>Админ панель</H1>

            <GContainer>
                <GBox href="/admin/email">
                    <GText>Почта</GText>
                </GBox>
            </GContainer>
        </MaxSize>
    )
}