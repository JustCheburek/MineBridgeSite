"use client"

import {ReloadSvg} from "@ui/SVGS";

export const ReloadButton = ({reload}: { reload: Function }) => (
		<button onClick={() => reload}>
			<ReloadSvg
					width="3rem"
					height="3rem"
					className="unic_color"
			/>
		</button>
)