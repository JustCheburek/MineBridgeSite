export const DS_URL = "https://discord.gg/rmWAuKGb69"
export const TG_URL = "https://t.me/MineBridgeOfficial"
export const VK_URL = "https://vk.com/minebridge"
export const SUPPORT_URL = "https://discord.gg/f95V9Rezqy"
const utcDate = new Date(2024, 11 - 1, 23, 4).toUTCString()
export const LASTRULESUPDATE = new Date(utcDate)

export const URLS_START = {
	discord: `https://discord.gg/`,
	telegram: `https://t.me/`,
	vk: `https://vk.com/`,
	twitch: `https://www.twitch.tv/`,
	youtube: `https://youtube.com/@`,
	donationAlerts: `https://donationalerts.com/r/`,
}

export const MBSESSION = "minebridge-session"
export type SocialName = keyof typeof URLS_START
