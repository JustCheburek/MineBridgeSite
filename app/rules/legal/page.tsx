import type {Metadata} from "next";
import {H1} from "@components/h1";
import {GBox, GContainer, GText} from "@components/grid";

export const metadata: Metadata = {
    title: "Правила",
    description: "Звёзды — внутриигровая награда или наказание. Суды, баны, всё это про нас!"
};

export default function Rules() {
    return (<>
        <div className="rules_content">
            <H1>Политики</H1>

            <GContainer border height={100} width={500} row={1}>
                <GBox href="/rules/legal/terms-of-use">
                    <GText center>Пользовательское соглашение</GText>
                </GBox>

                <GBox href="/rules/legal/privacy-policy">
                    <GText center>Политика конфиденциальности</GText>
                </GBox>

                <GBox href="/rules/legal/refund-policy">
                    <GText center>Политика возврата средств</GText>
                </GBox>
            </GContainer>
        </div>
    </>)
}