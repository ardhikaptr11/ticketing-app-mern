import mongoose from "mongoose";

import { MONGODB_CONNECTION_STRING, MONGODB_DATABASE } from "./env";

const connect = async () => {
	try {
		await mongoose.connect(MONGODB_CONNECTION_STRING, {
			dbName: MONGODB_DATABASE
		});

		return Promise.resolve("Database connected successfully!");
	} catch (error) {
		return Promise.reject(error);
	}
};

export default connect;
