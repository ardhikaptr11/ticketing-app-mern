import dotenv from "dotenv";

dotenv.config();

export const SECRET: string = process.env.SECRET || "";
export const MONGODB_CONNECTION_STRING: string = process.env.MONGODB_CONNECTION_STRING || "";
export const MONGODB_DATABASE: string = process.env.MONGODB_DATABASE || "";
export const EMAIL_SMTP_SECURE: boolean = Boolean(process.env.EMAIL_SMTP_SECURE) || false;
export const EMAIL_SMTP_USER: string = process.env.EMAIL_SMTP_USER || "";
export const EMAIL_SMTP_PASS: string = process.env.EMAIL_SMTP_PASS || "";
export const EMAIL_SMTP_PORT: number = Number(process.env.EMAIL_SMTP_PORT) || 465;
export const EMAIL_SMTP_HOST: string = process.env.EMAIL_SMTP_HOST || "";
export const EMAIL_SMTP_SERVICE: string = process.env.EMAIL_SMTP_SERVICE || "";
export const CLIENT_HOST: string = process.env.CLIENT_HOST || "http://localhost:8765"