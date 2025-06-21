import { Request } from "express";
import { Types } from "mongoose";
import { MulterError } from "multer";

export interface CustomMulterError extends Omit<MulterError, "code"> {
	code: MulterError["code"] | "MISSING_FIELD_NAME";
	status: number;
}

export interface User {
	fullName: string;
	username: string;
	email: string;
	password: string;
	role: string;
	profilePicture: string;
	isActive: boolean;
	activationCode: string;
	createdAt?: string;
}

export interface IUserToken
	extends Omit<
		User,
		"fullName" | "username" | "email" | "password" | "profilePicture" | "isActive" | "activationCode"
	> {
	id: Types.ObjectId;
}

export interface IReqUser extends Request {
	user?: IUserToken;
}

export interface IPaginationQuery {
	page: number;
	limit: number;
	search?: number;
}
