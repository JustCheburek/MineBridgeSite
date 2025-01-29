"use server";

import {RconClient} from '@0x0c/rcon';
import {cache} from "react"

export const RconMB = cache(
    async () => {
        console.log("Подключение к RCON MB")
        return new RconClient({
            host: process.env.SERVER_IP!,
            port: Number(process.env.SERVER_PORT_MB!),
            password: process.env.SECRET!
        });
    }
)

export const RconVC = cache(
    async () => {
        console.log("Подключение к RCON Velocity")
        return new RconClient({
            host: process.env.SERVER_IP!,
            port: Number(process.env.SERVER_PORT_VC!),
            password: process.env.SECRET!
        });
    }
)

export const GetHours = cache(
    async (name: string) => {
        const client = await RconMB()
        let hours = -1

        try {
            hours = Number(
                (
                    await client.send(`scoreboard players get ${name} hours`)
                ).split(" ")[2]
            )
        } catch (e) {
            console.error(e)
        }

        client.disconnect()

        return hours
    }
)

export const AddWLConsole = cache(
    async (name: string) => {
        const client = await RconVC()
        let whitelist = false

        try {
            await client.send(`lpv user ${name} group add whitelist`)
            whitelist = true
        } catch (e) {
            console.error(e)
        }

        client.disconnect()

        return whitelist
    }
)

export const SuffixConsole = cache(
    async (suffix: string, name: string) => {
        const client = await RconVC()
        let answer

        try {
            answer = await client.send(`lpv user ${name} meta setsuffix 5 ${suffix}`)
        } catch (e) {
            console.error(e)
        }

        client.disconnect()
        return answer
    }
)

export const SetPermConsole = cache(
    async (permission: string, name: string) => {
        try {
            const client = await RconVC()
            await client.send(`lpv user ${name} permission set ${permission}`)
        } catch (e) {
            console.error(e)
        }
    }
)

export const IsPerm = cache(
    async (permission: string, name: string) => {
        const client = await RconVC()
        let result = false

        try {
            result = (
                await client.send(`lpv user ${name} permission check ${permission}`)
            ).includes("true")
        } catch (e) {
            console.error(e)
        }

        client.disconnect()

        return result
    }
)