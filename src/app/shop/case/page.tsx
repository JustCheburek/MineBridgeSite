// Next
import {api} from "@server/axios";
import {Case, Drop} from "@src/types/case";
import type {Metadata} from "next";
import {notFound} from "next/navigation";

// Компоненты
import {CaseClient} from "./caseClient";
import {validate} from "@server/validate";

export const metadata: Metadata = {
	title: "Кейсы | MineBridge",
	description: "Здесь можно расслабится и покрутить кейсы. Интересно, что же выпадет?",
};

export default async function CasePage() {
	const {user} = await validate()
	const cases = await api<Case[]>(`/cases`).then(r => r.data).catch(notFound)
	const drops = await api<Drop[]>(`/drops`).then(r => r.data).catch(notFound)

	return (
			<CaseClient cases={cases} drops={drops} user={user}/>
	)
}