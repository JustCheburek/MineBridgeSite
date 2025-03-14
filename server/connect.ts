import {connect, connections} from "mongoose";

const MONGO_URL = process.env.MONGODB_URI!
if (!MONGO_URL) {
    throw new Error(
        "MONGO_URL в .env"
    );
}

export async function Connect() {
    if (connections[0].readyState) {
        return
    }

    while (true) {
        try {
            console.log("Подключение к DB")
            await connect(MONGO_URL, {minPoolSize: 10})
            console.log("Подключено к DB")

            break
        } catch (e) {
            console.error(e)
        }
    }
}
