import type {PropsWithChildren} from "react";
import {ProfilePage} from "schema-dts";
import {getUser} from "@/services";
import {SubsectionItem, Subsections} from "@components/sideNav";
import {MaxSize} from "@components/maxSize";
import type {Metadata} from "next";
import {NameParams} from "@/types/params";

export const generateMetadata = async ({params}: NameParams): Promise<Metadata> => {
    const {name} = await params
    const {
        user
    } = await getUser(
        {name}, true, false
    )

    return {
        openGraph: {
            type: "profile",
            username: name,
            images: [
                user.photo
            ]
        }
    }
}



export default async function UserLayout(
    {
        children,
        params
    }: PropsWithChildren<NameParams>) {
    const {name} = await params
    const {user} = await getUser({name})

    const person: ProfilePage = {
        "@type": "ProfilePage",
        name: name,
        image: user.photo,
        description: `${name} играет на Майнбридж, а ты?)`,
        url: `${process.env.NEXT_PUBLIC_RU_URL}/user/${name}`,
        // @ts-ignore
        dateCreated: user?.createdAt?.toString() || user?.date?.toString() || new Date().toString(),
        dateModified: user?.updatedAt?.toString() || new Date().toString()
    }

    return (
        <MaxSize sideNav>
            <Subsections menu="Меню профиля">
                <SubsectionItem href={`/user/${name}`}>
                    Профиль
                </SubsectionItem>
                <SubsectionItem href={`/user/${name}/history`}>
                    История
                </SubsectionItem>
                <SubsectionItem href={`/user/${name}/accounts`}>
                    Аккаунты
                </SubsectionItem>
            </Subsections>

            <script type="application/ld+json" dangerouslySetInnerHTML={{__html: JSON.stringify(person)}}/>

            {children}
        </MaxSize>
    )
}