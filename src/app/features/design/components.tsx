"use client"

import {PieChart} from "react-minimal-pie-chart";

export function ColorsPie() {
	return (
			<PieChart
					data={[
						{ title: 'Акцент', value: 10, color: '#00A7B1' },
						{ title: 'Текст', value: 30, color: '#F1F1F1' },
						{ title: 'Фон', value: 60, color: '#161C1F' },
					]}
					animate
					animationDuration={2000}
					animationEasing="ease"
					lineWidth={30}

			/>
	)
}