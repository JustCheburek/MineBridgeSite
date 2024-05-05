import {models} from "mongoose"
import {getModelForClass, ReturnModelType} from '@typegoose/typegoose';
import {User} from "@/types/user";
import {Session} from "@/types/session";
import {Drop, Case} from "@/types/case";
import {connect} from 'mongoose'

const MONGO_URL = process.env.MONGO_URL!
if (!MONGO_URL) {
	throw new Error(
			"MONGO_URL в .env"
	);
}

let cached = (global as any).mongoose || { conn: null, promise: null };

async function Connect() {
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

export const userModel = (models?.User || getModelForClass(User)) as ReturnModelType<typeof User>
export const sessionModel = (models?.Session || getModelForClass(Session)) as ReturnModelType<typeof Session>
export const caseModel = (models?.Case || getModelForClass(Case)) as ReturnModelType<typeof Case>
export const dropModel = (models?.Drop || getModelForClass(Drop)) as ReturnModelType<typeof Drop>
