export const DS_URL = "https://discord.gg/rmWAuKGb69"
export const TG_URL = "https://t.me/MineBridgeOfficial"
export const VK_URL = "https://vk.com/minebridge"
export const SUPPORT_URL = "https://discord.gg/f95V9Rezqy"
const utcDate = new Date(2024, 12 - 1, 19, 19 - 10, 0).toUTCString()
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
