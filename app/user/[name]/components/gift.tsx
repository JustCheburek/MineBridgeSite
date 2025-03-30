"use client"

import {GiftSvg} from "@ui/SVGS";
import {Add} from "@components/formBox";
import {useState} from "react";
import {GiftModal} from "@modals/gift";
import type {User} from "lucia";
import Link from "next/link";

export function GiftBox({user, author, isMe}: { user: User, author: User, isMe: boolean }) {
    const [modal, setModal] = useState(false)

    if (isMe) {
        return (
            <Link href="/users">
                <Add>
                    <GiftSvg size="100%"/>
                </Add>
            </Link>
        )
    }

    return (<>
        <Add setModal={setModal}>
            <GiftSvg size="100%"/>
        </Add>
        <GiftModal modal={modal} setModal={setModal} user={user} author={author}/>
    </>)
}