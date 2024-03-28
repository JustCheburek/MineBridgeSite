// Next
import type {Metadata} from "next";
import {CasesGet, DropsGet} from "@src/service";
import {validate} from "@server/validate";

// Компоненты
import {CaseClient} from "./caseClient";

export const metadata: Metadata = {
	title: "Кейсы | MineBridge",
	description: "Здесь можно расслабится и покрутить кейсы. Интересно, что же выпадет?",
};

export default async function CasePage() {
	const {user} = await validate()
	const cases = await CasesGet()
	const drops = await DropsGet()

	return (
			<CaseClient cases={cases} drops={drops} user={user}/>
	)
}