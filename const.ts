import { PathID } from '@app/milkyway/page'

export const DS_URL = 'https://discord.gg/rmWAuKGb69'
export const TG_URL = 'https://t.me/MineBridgeOfficial'
export const VK_URL = 'https://vk.com/minebridge'
export const SUPPORT_URL = 'https://discord.gg/f95V9Rezqy'

export const LASTSHOPUPDATE = new Date(new Date(2025, 6 - 1, 6, 12 - 10, 0).toUTCString())
export const LASTRULESUPDATE = new Date(new Date(2025, 5 - 1, 16, 13 - 10, 0).toUTCString())
export const LASTLORUPDATE = new Date(new Date(2025, 3 - 1, 27, 12 - 10, 40).toUTCString())
export const LASTTERMSOFUSEUPDATE = new Date(new Date(2025, 4 - 1, 5, 21 - 10, 0).toUTCString())
export const LASTPRIVACYPOLICYUPDATE = new Date(new Date(2025, 4 - 1, 5, 22 - 10, 0).toUTCString())
export const LASTREFUNDPOLICYUPDATE = new Date(new Date(2025, 4 - 1, 5, 22 - 10, 0).toUTCString())

export const URLS_START = {
  discord: `https://discord.gg/`,
  telegram: `https://t.me/`,
  vk: `https://vk.com/`,
  twitch: `https://www.twitch.tv/`,
  youtube: `https://youtube.com/@`,
  donationAlerts: `https://donationalerts.com/r/`,
}

export const NO_ROLES = {
  isAdmin: false,
  isHelper: false,
  isContentMaker: false,
  isModer: false,
}
export const AUTO = {
  MOD: 'AutoMod',
  HOURS: 'AutoHours',
  MONITORING: 'AutoMonitoring',
}

export const MBSESSION = 'minebridge-session'
export type SocialName = keyof typeof URLS_START

export const ROLES = {
  admin: 'админ',
  helper: 'помогатор',
  content: 'контент',
  moder: 'модер',
  donate: 'спонсор',
  lor: 'лородел',
  mem: 'мемодел',
  tester: 'тестировщик',
  mer: 'мэр',
}

export const ROLES_START = {
  place: 'p: ',
  name: 'u: ',
}

export const DBS = {
  LL: 'librelogin',
}

export const PREMBCOST = 100

export const Paths: PathID[] = [
  {
    rating: 25,
    x: -35,
    caseData: {
      Item: '662ddb0f8d5044c0b4ad7b5a',
      DropItem: '662ddb0f8d5044c0b4ad7b57',
      rarity: 'common',
    },
  },
  {
    rating: 50,
    x: 40,
    caseData: {
      Item: '662de3cd8d5044c0b4ad86fb',
      DropItem: '662de3cd8d5044c0b4ad86fa',
      rarity: 'common',
    },
  },
  {
    rating: 75,
    x: -30,
    caseData: {
      Item: '662de3d68d5044c0b4ad871b',
      DropItem: '662de3d68d5044c0b4ad871a',
      rarity: 'epic',
      suffix: '&7крутой',
    },
  },
  {
    rating: 100,
    x: 45,
    caseData: {
      Item: '662ddb0f8d5044c0b4ad7b5c',
      DropItem: '662ddb0f8d5044c0b4ad7b57',
      rarity: 'common',
    },
  },
  {
    rating: 125,
    x: -50,
    caseData: {
      DropItem: '662de3cd8d5044c0b4ad86fa',
      Item: '662de3cd8d5044c0b4ad86fc',
      rarity: 'common',
    },
  },
  {
    rating: 150,
    x: 50,
    caseData: {
      DropItem: '677bc4cdc10a0180e42f7f1c',
      Item: '677c94c241427b6b226c8d1a',
      rarity: 'common',
    },
  },
  {
    rating: 200,
    x: 10,
    caseData: {
      DropItem: '662ddb0f8d5044c0b4ad7b57',
      Item: '662ddb0f8d5044c0b4ad7b58',
      rarity: 'common',
    },
  },
  {
    rating: 250,
    x: -30,
    caseData: {
      Item: '662de3d68d5044c0b4ad871b',
      DropItem: '662de3d68d5044c0b4ad871a',
      rarity: 'epic',
      suffix: '&7атом',
    },
  },
  {
    rating: 300,
    x: 45,
    caseData: {
      DropItem: '662ddb0f8d5044c0b4ad7b57',
      Item: '662ddb0f8d5044c0b4ad7b5e',
      rarity: 'common',
    },
  },
  {
    rating: 350,
    x: -50,
    caseData: {
      DropItem: '662de3cd8d5044c0b4ad86fa',
      Item: '662de3cd8d5044c0b4ad86ff',
      rarity: 'common',
    },
  },
  {
    rating: 400,
    x: 50,
    caseData: {
      DropItem: '662ddb0f8d5044c0b4ad7b57',
      Item: '662ddb0f8d5044c0b4ad7b60',
      rarity: 'common',
    },
  },
  {
    rating: 500,
    x: 10,
    caseData: {
      DropItem: '677bc4cdc10a0180e42f7f1c',
      Item: '677c94eb41427b6b226c8d1d',
      rarity: 'common',
    },
  },
  {
    rating: 700,
    x: -40,
    caseData: {
      DropItem: '677bc4cdc10a0180e42f7f1c',
      Item: '677c950941427b6b226c8d20',
      rarity: 'rare',
    },
  },
]
