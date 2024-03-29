"use client"

import type {ChangeEvent} from "react";
import {PieChart, type PieChartProps} from "react-minimal-pie-chart";
import {parseAsStringEnum, useQueryState} from "nuqs";

import styles from "./design.module.scss"

import {Url} from "@components/button";
import {Form, FormSelect} from "@components/form";

import {Img} from "@components/img";

export function ColorsPie({data}: { data: PieChartProps["data"] }) {
	return (
			<PieChart
					data={data}
					animate
					animationDuration={2000}
					animationEasing="ease"
					lineWidth={30}
					startAngle={-90}
					paddingAngle={0}
			/>
	)
}

export function Download() {
	const logos = [
		{
			name: "svg",
			type: "svg"
		}, {
			name: "16x16",
			type: "png"
		}, {
			name: "32x32",
			type: "png"
		}, {
			name: "64x64",
			type: "png"
		}, {
			name: "120x120",
			type: "png"
		}, {
			name: "150x150",
			type: "png"
		}, {
			name: "180x180",
			type: "png"
		}, {
			name: "192x192",
			type: "png"
		}, {
			name: "256x256",
			type: "png"
		}
	]

	const names = logos.map(logo => logo.name)
	const [logoName, setLogoName] = useQueryState("logo", parseAsStringEnum(names).withDefault("256x256"))

	function selectLogo(e: ChangeEvent<HTMLSelectElement>) {
		"use client"
		e.preventDefault()
		setLogoName(e.target.value)
	}

	const path = `/logos/${logoName}/logo.${logos.find(logo => logo.name === logoName)?.type}`

	return (
			<div className={styles.download}>
				<div>
					<Form>
						<FormSelect name="logos" id="logos" onChange={selectLogo}>
							{logos.map(logo => (
									<option key={logo.name} value={logo.name} selected={logo.name === logoName}>
										{logo.name}
									</option>
							))}
						</FormSelect>
					</Form>

					<Url href={path} download>
						Скачать
					</Url>
				</div>

				<Img
						src={path}
						alt={`Лого ${logoName}`}
						width={200}
				/>
			</div>
	)
}