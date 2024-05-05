import {cache} from "react";
import {cookies} from "next/headers";
import {lucia} from "@server/lucia";
import {getAuthor} from "@/services";

export const validate = cache(
		async () => {
			const sessionId = cookies().get(lucia.sessionCookieName)?.value ?? null;

			if (!sessionId) {
				return {
					user: null,
					roles: [], isModer: false, isAdmin: false
				}
			}

			const {user, session} = await lucia.validateSession(sessionId);

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

			return await getAuthor(user?.id)
		}
);