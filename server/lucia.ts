import {Lucia} from "lucia";
import {Discord, Google, Twitch} from "arctic";
import {adapter} from "./adapter";
import {User} from "@/types/user";
import {MBSESSION} from "@/const";

export const lucia = new Lucia(adapter, {
    sessionCookie: {
        name: MBSESSION,
        expires: false,
        attributes: {
            secure: process.env.NODE_ENV === "production"
        }
    },
    getUserAttributes: user => user
});

declare module "lucia" {
    interface Register {
        Lucia: typeof lucia
        DatabaseUserAttributes: InstanceType<typeof User>
    }
}

export const discord = new Discord(process.env.DISCORD_CLIENT_ID!, process.env.DISCORD_CLIENT_SECRET!, `${process.env.NEXT_PUBLIC_RU_URL}/auth/discord/callback`);
export const google = new Google(process.env.GOOGLE_CLIENT_ID!, process.env.GOOGLE_CLIENT_SECRET!, `${process.env.NEXT_PUBLIC_PUNYCODE_URL}/auth/google/callback`)
export const twitch = new Twitch(process.env.TWITCH_CLIENT_ID!, process.env.TWITCH_CLIENT_SECRET!, `${process.env.NEXT_PUBLIC_PUNYCODE_URL}/auth/twitch/callback`)