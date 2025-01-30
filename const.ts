import {PathID} from "@app/milkyway/page";

export const DS_URL = "https://discord.gg/rmWAuKGb69"
export const TG_URL = "https://t.me/MineBridgeOfficial"
export const VK_URL = "https://vk.com/minebridge"
export const SUPPORT_URL = "https://discord.gg/f95V9Rezqy"
const utcDate = new Date(2025, 1 - 1, 12, 14 - 10, 30).toUTCString()
export const LASTRULESUPDATE = new Date(utcDate)

export const URLS_START = {
	discord: `https://discord.gg/`,
	telegram: `https://t.me/`,
	vk: `https://vk.com/`,
	twitch: `https://www.twitch.tv/`,
	youtube: `https://youtube.com/@`,
	donationAlerts: `https://donationalerts.com/r/`,
}

export const NO_ROLES = {
	isAdmin: false, isHelper: false, isContentMaker: false, isModer: false
}
export const AUTO = {
	MOD: "AutoMod",
	HOURS: "AutoHours"
}

export const MBSESSION = "minebridge-session"
export type SocialName = keyof typeof URLS_START

export const Paths: PathID[] = [{
	rating: 25,
	x: -50,
	caseData: {
		Item: "662ddb0f8d5044c0b4ad7b5a",
		DropItem: "662ddb0f8d5044c0b4ad7b57",
		rarity: "common"
	}
}, {
	rating: 50,
	x: 40,
	caseData: {
		Item: "662de3cd8d5044c0b4ad86fb",
		DropItem: "662de3cd8d5044c0b4ad86fa",
		rarity: "common"
	}
}, {
	rating: 75,
	x: -40,
	caseData: {
		Item: "662de3d68d5044c0b4ad871b",
		DropItem: "662de3d68d5044c0b4ad871a",
		rarity: "epic",
		suffix: "&7молодец"
	}
}, {
	rating: 100,
	x: 20,
	caseData: {
		Item: "662ddb0f8d5044c0b4ad7b5c",
		DropItem: "662ddb0f8d5044c0b4ad7b57",
		rarity: "common"
	}
}]
