import {lucia} from "@db/lucia";
import {getAuthor} from "@/services/user";
import type {User} from "lucia";
import {cache} from "react";
import {cookies} from "next/headers";
import {NO_ROLES} from "@/const";
import {RolesApi} from "@/services/user";

export const validate = cache(
    async (): Promise<{ user: User | null } & RolesApi> => {
        const cookiesStore = await cookies()
        const sessionId = cookiesStore.get(lucia.sessionCookieName)?.value
        if (!sessionId) {
            return {
                user: null, roles: [],
                ...NO_ROLES
            }
        }

        const {user, session} = await lucia.validateSession(sessionId);

        try {
            let sessionCookie
            if (session && session.fresh) {
                sessionCookie = lucia.createSessionCookie(session.id);
            } else {
                sessionCookie = lucia.createBlankSessionCookie();
            }
            cookiesStore.set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes);
        } catch {
        }

        return await getAuthor(user?.id)
    }
); 