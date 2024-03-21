import {Lucia} from "lucia";
import {Discord, Google} from "arctic";
import {adapter} from "./adapter";

import {User} from "@src/types/user";

export const lucia = new Lucia(adapter, {
	sessionCookie: {
		name: "minebridge-session",
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

export const discord = new Discord(process.env.DISCORD_CLIENT_ID!, process.env.DISCORD_CLIENT_SECRET!, `${process.env.MB_URL}/auth/discord/callback`);
export const google = new Google(process.env.GOOGLE_CLIENT_ID!, process.env.GOOGLE_CLIENT_SECRET!, `${process.env.MB_URL}/auth/google/callback`)