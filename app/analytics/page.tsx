import {MaxSize} from "@components/maxSize";
import {getUsers} from "@/services";
import {PBox, PText, PTitle} from "@components/post";
import type {Metadata} from "next";
import {revalidateTag} from "next/cache";
import {H1} from "@components/h1";

// мс * с * мин * ч * д
const day = 1000 * 60 * 60 * 24
const week = day * 7
const month = day * 30

export const metadata: Metadata = {
	title: "Аналитика | Майнбридж",
	description: "Сколько человек на сервере и откуда пришли, капец!",
};

export default async function Analytics() {
	const users = await getUsers()

	const total = users.length
	const onlineAtDay = users.filter(user => {
		if (!user.onlineAt) return false
		const time = new Date().getTime() - new Date(user.onlineAt).getTime()
		return time < day
	}).length
	const onlineAtWeek = users.filter(user => {
		if (!user.onlineAt) return false
		const time = new Date().getTime() - new Date(user.onlineAt).getTime()
		return time < week
	}).length
	const onlineAtMonth = users.filter(user => {
		if (!user.onlineAt) return false
		const time = new Date().getTime() - new Date(user.onlineAt).getTime()
		return time < month
	}).length

	return (
			<MaxSize className="grid_center">
				<H1 reload={async () => {
					"use server";
					revalidateTag("seasons")
				}}>
					Аналитика
				</H1>

				<PBox>
					<PTitle>
						<h2>Онлайн</h2>
					</PTitle>
					<PText>
						<h4>Всего: <span className="unic_color medium-font">{total}</span></h4>
						<h4><span className="unic_color medium-font">{onlineAtDay}</span> за сегодня</h4>
						<h4><span className="unic_color medium-font">{onlineAtWeek}</span> за неделю</h4>
						<h4><span className="unic_color medium-font">{onlineAtMonth}</span> за месяц</h4>
					</PText>
				</PBox>
			</MaxSize>
	)
}