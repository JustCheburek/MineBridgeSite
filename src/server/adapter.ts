import {MongodbAdapter} from "@lucia-auth/adapter-mongodb";
import {connection} from 'mongoose';
import {connect} from "./db";

connect()

export const adapter = new MongodbAdapter(
		// @ts-ignore
		connection.collection("sessions"),
		connection.collection("users")
);