import {connect} from "mongoose";

const MONGO_URL = process.env.MONGO_URL!
if (!MONGO_URL) {
	throw new Error(
			"MONGO_URL в .env"
	);
}

let cached = (global as any).mongoose || { conn: null, promise: null };

export async function Connect() {
	if (cached.conn) {
		return cached.conn
	}

	if (!cached.promise) {
		console.log("Подключение к DB")
		cached.promise = await connect(MONGO_URL).then(mongoose => mongoose)
		console.log("Подключено к DB")
	}

	cached.conn = await cached.promise
	return cached.conn
}

Connect()