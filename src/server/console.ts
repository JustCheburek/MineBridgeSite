import {RCON} from 'minecraft-server-util'
import {cache} from "react";

export const Rcon = cache(async () => {
	const client = new RCON()

	console.log("Подключение к RCON Velocity")
	await client.connect(process.env.SERVER_IP!, Number(process.env.SERVER_PORT!));
	await client.login(process.env.SECRET!);

	return client
})