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
        try {
            return await client.send(`scoreboard players get ${name} hours`)
        } catch (e) {
            console.log(e)
        }
    }
)

export const AddWLConsole = cache(
    async (name: string) => {
        const client = await RconMB()

        await client.send(`whitelist add ${name}`)
    }
)

export const RemoveWLConsole = cache(
    async (name: string) => {
        const client = await RconMB()

        await client.send(`whitelist remove ${name}`)
    }
)