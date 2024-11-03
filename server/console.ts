import {RCON} from 'minecraft-server-util'
import {unstable_cache as cache} from "next/cache";

export const RconMB = cache(
    async () => {
        const client = new RCON()

        console.log("Подключение к RCON выживание")
        await client.connect(process.env.SERVER_IP!, Number(process.env.SERVER_PORT_MB!));
        await client.login(process.env.SECRET!);

        return client
    },
    ["console", "minecraft"]
)

export const RconVC = cache(
    async () => {
        const client = new RCON()

        console.log("Подключение к RCON Velocity")
        await client.connect(process.env.SERVER_IP!, Number(process.env.SERVER_PORT_VC!));
        await client.login(process.env.SECRET!);

        return client
    },
    ["console", "velocity"]
)

export const AddWLConsole = cache(
    async (name: string) => {
        const client = await RconMB()

        await client.run(`whitelist add ${name}`)
        await client.run(`whitelist add .${name}`)
    },
    ["console", "whitelist"]
)

export const RemoveWLConsole = cache(
    async (name: string) => {
        const client = await RconMB()

        await client.run(`whitelist remove ${name}`)
        await client.run(`whitelist remove .${name}`)
    },
    ["console", "whitelist"]
)