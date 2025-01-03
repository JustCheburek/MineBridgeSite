"use client"

import {ReloadSvg} from "@ui/SVGS";

type ReloadButton = {
    reload: () => void
    className?: string
}

export const ReloadButton = ({reload, className = ""}: ReloadButton) => (
    <button
        onClick={() => reload()}
        className={`unic_button ${className}`} title="Перезагрузка"
    >
        <ReloadSvg
            size="3rem"
            className="unic_color"
        />
    </button>
)