"use client"

import {ReloadSvg} from "@ui/SVGS";

type ReloadButton = {
    action: () => void
    size?: string
    title?: string
    className?: string
}

export const ReloadButton = ({action, size="3rem", title="Перезагрузка", className = ""}: ReloadButton) => (
    <button
        onClick={() => action()}
        className={`unic_button ${className}`} title={title}
    >
        <ReloadSvg
            size={size}
            className="unic_color"
        />
    </button>
)