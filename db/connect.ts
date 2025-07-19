import { connect, connections } from 'mongoose'
import mysql from 'mysql2/promise.js'

const MONGO_URL = process.env.MONGODB_URI!
if (!MONGO_URL) {
  throw new Error('MONGO_URL в .env')
}

export async function MGConnect() {
  if (connections[0].readyState) {
    return
  }

  while (true) {
    try {
      console.log('Подключение к DB')
      await connect(MONGO_URL, {
        maxPoolSize: 20, // Максимальный размер пула подключений
        minPoolSize: 10, // Минимальный размер пула
        serverSelectionTimeoutMS: 5000, // Быстрое завершение при ошибках
        socketTimeoutMS: 45000, // Закрытие "мертвых" сокетов
        connectTimeoutMS: 10000, // Время ожидания соединения
        family: 4, // IPv4-only для ускорения
        keepAliveInitialDelay: 300000, // Задержка перед первым keep-alive
      })
      console.log('Подключено к DB')

      break
    } catch (e) {
      console.error(e)
    }
  }
}

export async function MySQLConnect(db?: string) {
  return mysql.createPool({
    host: process.env.SERVER_IP!,
    port: Number(process.env.MYSQL_PORT!),
    user: process.env.MYSQL_USER!,
    password: process.env.MYSQL_PASSWORD!,
    database: db,
    connectTimeout: 10000,
  })
}
