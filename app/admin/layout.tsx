import {PropsWithChildren} from "react";
import {validate} from "@services/validate";
import {redirect} from "next/navigation";

export default async function Layout({children}: PropsWithChildren) {
    const {isAdmin} = await validate()

    if (!isAdmin) {
        redirect("/")
    }

    return children
}