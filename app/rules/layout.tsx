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
                <SubsectionItem href="/rules/roles">
                    Роли
                </SubsectionItem>
                <SubsectionItem href="/rules/legal" exact={false}>
                    Legal
                </SubsectionItem>
            </Subsections>
            {children}
        </MaxSize>
    );
}