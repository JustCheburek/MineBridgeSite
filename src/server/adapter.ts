import {MongodbAdapter} from "@lucia-auth/adapter-mongodb";
import {connection} from 'mongoose';
import {connect} from "./db";

connect()

// @ts-ignore
export const adapter = new MongodbAdapter(
		connection.collection("sessions"),
		connection.collection("users")
);