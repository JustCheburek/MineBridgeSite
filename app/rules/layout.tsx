// React
import type {PropsWithChildren} from "react";

// Компоненты
import {SubsectionItem, Subsections} from "@components/sideNav";
import {MaxSize} from "@components/maxSize";

export default function RulesLayout(
    {
        children,
    }: PropsWithChildren) {
    return (
        <MaxSize sideNav>
            <Subsections menu="Меню правил">
                <SubsectionItem href="/rules">
                    Правила
                </SubsectionItem>
                <SubsectionItem href="/rules/mods">
                    Файлы
                </SubsectionItem>
                <SubsectionItem href="/rules/blacklist">
                    Выражения
                </SubsectionItem>
                <SubsectionItem href="/rules/terms-of-use">
                    Соглашение
                </SubsectionItem>
            </Subsections>
            {children}
        </MaxSize>
    );
}