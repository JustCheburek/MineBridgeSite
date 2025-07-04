/*
<Suspense fallback={<Skeleton className="w-[1rem]"/>}>
    <MCRoles roles={roles} name={name}/>
</Suspense>

"use client"
import {GiveRolesConsole} from "@services/console";
import type {Role} from "@/types/role";
import styles from "../profile.module.scss"

export function MCRoles({roles, name}: { roles: Role[], name: string }) {
    return (<>
        <button onClick={() => GiveRolesConsole(roles, name)}>
            <small
                className="text-unic"
            >
                Получить роли в майне
            </small>
        </button>
    </>)
}*/
