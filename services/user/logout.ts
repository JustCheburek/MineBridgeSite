"use server";

import {cookies} from "next/headers";
import {MBSESSION} from "@/const";
import {lucia} from "@server/lucia";
import {revalidateTag} from "next/cache";

export async function Logout() {
    (await cookies()).delete(MBSESSION)
    await lucia.deleteExpiredSessions()
    revalidateTag("all")
}