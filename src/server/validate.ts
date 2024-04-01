import {cache} from "react";
import type {Session, User} from "lucia";
import {cookies} from "next/headers";
import {lucia} from "@server/lucia";
import {userModel} from "@server/models";
import {Role} from "@src/types/role";

export const validate = cache(
		async (): Promise<
				{
					user: User | null, session: Session | null,
					roles: Role[] | [], isModer: boolean, isAdmin: boolean
				}
		> => {
			const sessionId = cookies().get(lucia.sessionCookieName)?.value ?? null;

			if (!sessionId) {
				return {
					user: null, session: null,
					roles: [], isModer: false, isAdmin: false
				}
			}

			const {user, session} = await lucia.validateSession(sessionId);

			// next.js throws when you attempt to set cookie when rendering page
			try {
				if (session && session.fresh) {
					const sessionCookie = lucia.createSessionCookie(session.id);
					cookies().set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes);
				} else {
					const sessionCookie = lucia.createBlankSessionCookie();
					cookies().set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes);
				}
			} catch {
			}

			const {roles, isModer, isAdmin} = await userModel.getRoles(user?.discordId)

			return {user, session, roles, isModer, isAdmin};
		}
);