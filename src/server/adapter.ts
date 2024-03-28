import {MongodbAdapter} from "@lucia-auth/adapter-mongodb";
import {connection} from 'mongoose';
import {Connect} from "./db";

Connect()

export const adapter = new MongodbAdapter(
		// @ts-ignore
		connection.collection("sessions"),
		connection.collection("users")
);