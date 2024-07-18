import {toASCII} from "punycode";

export const DS_URL = "https://discord.gg/rmWAuKGb69"
export const TG_URL = "https://t.me/MineBridgeOfficial"
export const VK_URL = "https://vk.com/minebridge"
export const SUPPORT_URL = "https://discord.gg/f95V9Rezqy"
export const LASTRULESUPDATE = new Date(2024, 7 - 1, 1, 15, 30);
export const URL_PUNYCODE = toASCII(process.env.NEXT_PUBLIC_URL!)
export const JAVA_IP = `игра.${process.env.NEXT_PUBLIC_DOMEN!}`
export const BEDROCK_IP = toASCII(JAVA_IP)

export const URLS_START = {
	discord: `https://discord.gg/`,
	telegram: `https://t.me/`,
	vk: `https://vk.com/`,
	twitch: `https://www.twitch.tv/`,
	youtube: `https://youtube.com/@`,
	donationAlerts: `https://donationalerts.com/r/`,
}

export type SocialName = keyof typeof URLS_START