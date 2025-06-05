import {MaxSize} from "@components/maxSize";
import {H1} from "@components/h1";
import {GBox, GContainer, GText} from "@components/grid";
import type {Metadata} from "next";

export const metadata: Metadata = {
    title: "Админ панель"
};

export default async function AdminPanel() {
    return (
        <MaxSize className="center_text grid_center">
            <H1>Админ панель</H1>

            <GContainer width={150} height={50}>
                <GBox href="/admin/whitelist">
                    <h3>Проходка</h3>
                </GBox>
                <GBox href="/admin/email">
                    <h3>Почта</h3>
                </GBox>
            </GContainer>
        </MaxSize>
    )
}