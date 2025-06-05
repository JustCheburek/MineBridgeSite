"use client"

import { useState } from "react"
import type { User } from "lucia"
import { Button } from "@components/button"
import { WhitelistModal } from "@ui/components/modals/whitelist"

export function AdminWhitelistReset({ userswl }: { userswl: User[] }) {
    const [modal, setModal] = useState(false)
    if (!userswl.length) return null
    return (
        <>
            <Button danger onClick={() => setModal(true)} style={{ marginBottom: 16 }}>
                Сбросить проходку у всех
            </Button>
            <WhitelistModal modal={modal} setModal={setModal} />
        </>
    )
}
