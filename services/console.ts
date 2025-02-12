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

export const RconHUB = cache(
    async () => {
        console.log("Подключение к RCON HUB")
        return new RconClient({
            host: process.env.SERVER_IP!,
            port: Number(process.env.SERVER_PORT_HUB!),
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

export const StarsMBConsole = cache(
    async (stars: number, name: string) => {
        const client = await RconMB()

        try {
            await client.send(`stars ${name} ${stars}`)
        } catch (e) {
            console.error(e)
        }

        client.disconnect()
    }
)

export const StarsHUBConsole = cache(
    async (stars: number, name: string) => {
        const client = await RconHUB()

        try {
            await client.send(`stars ${name} ${stars}`)
        } catch (e) {
            console.error(e)
        }

        client.disconnect()
    }
)

export const MostikiMBConsole = cache(
    async (mostiki: number, name: string) => {
        const client = await RconMB()

        try {
            await client.send(`mostiki ${name} ${mostiki}`)
        } catch (e) {
            console.error(e)
        }

        client.disconnect()
    }
)

export const MostikiHUBConsole = cache(
    async (mostiki: number, name: string) => {
        const client = await RconHUB()

        try {
            await client.send(`mostiki ${name} ${mostiki}`)
        } catch (e) {
            console.error(e)
        }

        client.disconnect()
    }
)