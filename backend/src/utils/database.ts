import mongoose from "mongoose";

import { MONGODB_CONNECTION_STRING, MONGODB_DATABASE, NODE_ENV } from "./env";
import { CategoryModel } from "../models/category.model";
import { EventModel } from "../models/event.model";

const connect = async () => {
	try {
		mongoose.set("autoIndex", NODE_ENV !== "production");

		await mongoose.connect(MONGODB_CONNECTION_STRING, {
			dbName: MONGODB_DATABASE
		});

		if (NODE_ENV === "production") {
			await Promise.all([CategoryModel.createIndexes(), EventModel.createIndexes()]);
		}

		return "Database connected successfully!";
	} catch (error) {
		throw error;
	}
};

export default connect;
