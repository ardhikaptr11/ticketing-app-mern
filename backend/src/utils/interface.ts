import { Request } from "express";
import { ObjectId, Types } from "mongoose";
import { MulterError } from "multer";
import * as Yup from "yup";

import { eventDAO } from "../models/event.model";
import { ticketDAO } from "../models/ticket.model";
import { bannerDAO } from "../models/banner.model";

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
	search?: string;
	isFeatured?: string;
	isPublished?: string;
	isOnline?: string;
}

export interface ISendMail {
	from: string;
	to: string;
	subject: string;
	html: string;
}

export interface SendEmailOptions extends ISendMail {
	[key: string]: any;
}

export interface MockTransporter {
	sendMail: (options: SendEmailOptions) => Promise<{ id: string; response: string }>;
	verify: () => Promise<boolean>;
}

export interface Event extends Omit<Yup.InferType<typeof eventDAO>, "category" | "createdBy"> {
	category: ObjectId;
	createdBy: ObjectId;
}

export interface Ticket extends Omit<Yup.InferType<typeof ticketDAO>, "events"> {
	events: ObjectId;
}

export interface Banner extends Yup.InferType<typeof bannerDAO> {}
