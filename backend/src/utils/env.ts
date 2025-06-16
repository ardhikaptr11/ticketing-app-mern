import dotenv from "dotenv";

dotenv.config();

const SECRET: string = process.env.SECRET || "";
const MONGODB_CONNECTION_STRING: string = process.env.MONGODB_CONNECTION_STRING || "";
const MONGODB_DATABASE: string = process.env.MONGODB_DATABASE || "";

export { SECRET, MONGODB_CONNECTION_STRING, MONGODB_DATABASE };
