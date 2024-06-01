import {RCON} from 'minecraft-server-util'
import {cache} from "react";

/*export const RconMB = cache(
		async () => {
			const client = new RCON()

			console.log("Подключение к RCON выживание")
			await client.connect(process.env.SERVER_IP!, Number(process.env.SERVER_PORT_MB!));
			await client.login(process.env.SECRET!);

			return client
		}
)*/

export const RconVC = cache(
		async () => {
			const client = new RCON()

			console.log("Подключение к RCON Velocity")
			await client.connect(process.env.SERVER_IP!, Number(process.env.SERVER_PORT_VC!));
			await client.login(process.env.SECRET!);

			return client
		}
)