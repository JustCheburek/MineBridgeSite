import {Metadata} from "next";
import {MaxSize} from "@components/maxSize";
import {H1} from "@components/h1";
import {HeadBreakBox} from "./components";
import {validate} from "@/services/user/validate";
import {FormLink} from "@components/formBox";

export const metadata: Metadata = {
    title: "Головоломка",
    description: "Довольно сложная головоломка. Лор 7 сезон.",
    robots: {
        index: false
    },
}

export default async function HeadBreak() {
    const {user} = await validate()

    return (
        <MaxSize className="grid_center">
            <H1>
                Головоломка
            </H1>

            {user
                ? <HeadBreakBox name={user.name}/>
                : <FormLink href="/auth">
                    Сначала зарегистрируйся
                </FormLink>
            }
        </MaxSize>
    )
}