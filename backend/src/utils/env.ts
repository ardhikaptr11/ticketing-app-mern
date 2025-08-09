import dotenv from "dotenv";

dotenv.config();

export const NODE_ENV: string = process.env.NODE_ENV || "development";
export const SECRET: string = process.env.SECRET || "";
export const CLIENT_HOST: string = process.env.CLIENT_HOST || "http://localhost:8765";

export const MONGODB_CONNECTION_STRING: string = process.env.MONGODB_CONNECTION_STRING || "";
export const MONGODB_DATABASE: string = process.env.MONGODB_DATABASE || "";

export const EMAIL_SMTP_SECURE: boolean = Boolean(process.env.EMAIL_SMTP_SECURE) || false;
export const EMAIL_SMTP_USER: string = process.env.EMAIL_SMTP_USER || "";
export const EMAIL_SMTP_PASS: string = process.env.EMAIL_SMTP_PASS || "";
export const EMAIL_SMTP_PORT: number = Number(process.env.EMAIL_SMTP_PORT) || 465;
export const EMAIL_SMTP_HOST: string = process.env.EMAIL_SMTP_HOST || "";
export const EMAIL_SMTP_SERVICE: string = process.env.EMAIL_SMTP_SERVICE || "";

export const CLOUDINARY_CLOUD_NAME: string = process.env.CLOUDINARY_CLOUD_NAME || "";
export const CLOUDINARY_API_KEY: string = process.env.CLOUDINARY_API_KEY || "";
export const CLOUDINARY_API_SECRET: string = process.env.CLOUDINARY_API_SECRET || "";

export const GOOGLE_API_KEY: string = process.env.GOOGLE_API_KEY || "";
export const GOOGLE_GEOCODE_API_URL = process.env.GOOGLE_GEOCODE_API_URL || "";

export const MIDTRANS_SERVER_KEY: string = process.env.MIDTRANS_SERVER_KEY || "";
export const MIDTRANS_TRANSACTION_URL: string = process.env.MIDTRANS_TRANSACTION_URL || "";
