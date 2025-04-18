import {connect, connections} from "mongoose";
import mysql from "mysql2/promise.js"

const MONGO_URL = process.env.MONGODB_URI!
if (!MONGO_URL) {
    throw new Error(
        "MONGO_URL в .env"
    );
}

export async function MGConnect() {
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

export async function MySQLConnect() {
    return mysql.createPool({
        host: process.env.SERVER_IP!,
        port: Number(process.env.MYSQL_PORT!),
        user: process.env.MYSQL_USER!,
        password: process.env.MYSQL_PASSWORD!,
        database: process.env.MYSQL_DATABASE!,
        connectTimeout: 10000
    })
}


