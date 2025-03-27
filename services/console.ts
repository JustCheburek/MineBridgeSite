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
            const text = await client.send(`vclist add ${name}`)
            if (text === "") {
                whitelist = true
            }
        } catch (e) {
            console.error(e)
        }

        client.disconnect()

        return whitelist
    }
)

export const SetSuffixConsole = cache(
    async (suffix: string, name: string) => {
        const client = await RconVC()

        try {
            await client.send(`lpv user ${name} meta setsuffix 5 ${suffix}`)
        } catch (e) {
            console.error(e)
        }

        client.disconnect()
    }
)

export const RemoveSuffixConsole = cache(
    async (name: string) => {
        const client = await RconVC()

        try {
            await client.send(`lpv user ${name} meta removesuffix 5`)
        } catch (e) {
            console.error(e)
        }

        client.disconnect()
    }
)