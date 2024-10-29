import {unstable_cache as cache} from "next/cache";
import {cookies} from "next/headers";
import {lucia} from "@server/lucia";
import {getAuthor, RolesApi} from "@/services";
import type {User} from "lucia";

export const validate = cache(
		async (sessionId?: string): Promise<{user: User | null} & RolesApi> => {
			const cookiesStore = await cookies();
			if (!sessionId) {
				return {
					user: null, roles: [],
					isModer: false, isAdmin: false, isContentMaker: false
				}
			}

			const {user, session} = await lucia.validateSession(sessionId);

			try {
				if (session && session.fresh) {
					const sessionCookie = lucia.createSessionCookie(session.id);
					cookiesStore.set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes);
				} else {
					const sessionCookie = lucia.createBlankSessionCookie();
					cookiesStore.set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes);
				}
			} catch {
			}

			return await getAuthor(user?.id)
		},
		["validate", "userLike", "all"],
		{revalidate: 300, tags: ["validate", "userLike", "all"]}
);