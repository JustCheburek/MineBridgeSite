"use client"

import {GiftSvg} from "@ui/SVGS";
import {Add} from "@components/formBox";
import {useState} from "react";
import {GiftModal} from "@modals/gift";
import type {User} from "lucia";

export function GiftBox({user, author}: {user: User, author: User}) {
    const [modal, setModal] = useState(false)
    return (<>
        <Add setModal={setModal}>
            <GiftSvg size="100%"/>
        </Add>
        <GiftModal modal={modal} setModal={setModal} user={user} author={author}/>
    </>)
}