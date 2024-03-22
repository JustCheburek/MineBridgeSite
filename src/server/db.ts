import mongoose from 'mongoose'

const MONGO_URL = process.env.MONGO_URL!

/**
 * Global is used here to maintain a cached connection across hot reloads
 * in development. This prevents connections growing exponentially
 * during API Route usage.
 */
// @ts-ignore
let cached = global.mongoose

if (!cached) {
	// @ts-ignore
	cached = global.mongoose = {conn: null, promise: null}
}

export async function connect() {
	if (cached.conn) {
		return cached.conn
	}

	if (!cached.promise) {
		cached.promise = mongoose.connect(MONGO_URL).then(mongoose => mongoose)
	}
	cached.conn = await cached.promise
	return cached.conn
}