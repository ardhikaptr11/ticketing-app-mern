import { NextFunction, Request, Response } from "express";
import { string, object, ref } from "yup";

import { UserModel } from "../models/user.model";
import { encrypt } from "../utils/encryption";
import { generateToken } from "../utils/jwt";
import { IReqUser } from "../utils/interface";
import response from "../utils/response";

type TRegister = {
	fullName: string;
	username: string;
	email: string;
	password: string;
	confirmPassword: string;
};

type TLogin = {
	identifier: string;
	password: string;
};

const validateRegisterSchema = object({
	fullName: string().required(),
	username: string().required(),
	email: string().email().required(),
	password: string()
		.matches(
			/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
			"Password must contain at least 8 characters, one uppercase letter, one lowercase letter, one number and one special character"
		)
		.required("Password is required"),
	confirmPassword: string()
		.oneOf([ref("password")], "Password not match")
		.required("Confirmation password is required")
});

export const register = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const { fullName, username, email, password, confirmPassword } = req.body as unknown as TRegister;
		await validateRegisterSchema.validate({
			fullName,
			username,
			email,
			password,
			confirmPassword
		});

		const result = await UserModel.create({
			fullName,
			username,
			email,
			password
		});

		return response.success(res, result, "Registration success");
	} catch (error: any) {
		error.message = "Registration failed";
		next(error)
	}
};

export const login = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const { identifier, password } = req.body as unknown as TLogin;
		const userByIdentifier = await UserModel.findOne({
			$or: [
				{
					username: identifier
				},
				{
					email: identifier
				}
			],
			isActive: true
		});

		if (!userByIdentifier) {
			return response.error(res, { message: "User not found", status: 404 }, null);
		}

		const isPasswordValid: boolean = encrypt(password) === userByIdentifier.password;

		if (!isPasswordValid) return response.authError(res, 401, "Invalid password");

		const token = generateToken({
			id: userByIdentifier._id,
			role: userByIdentifier.role
		});

		response.success(res, token, "Login success");
	} catch (error: any) {
		error.message = "Login failed";
		next(error);
	}
};

export const me = async (req: IReqUser, res: Response, next: NextFunction) => {
	try {
		const user = req.user;
		const result = await UserModel.findById(user?.id);

		response.success(res, result, "Success get user profile");
	} catch (error: any) {
		error.message = "Failed to get user profile";
		next(error);
	}
};

export const activation = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const { code } = req.body as { code: string };
		const result = await UserModel.findOneAndUpdate(
			{
				activationCode: code
			},
			{
				isActive: true
			},
			{
				new: true
			}
		);

		response.success(res, result, "User successfully activated");
	} catch (error: any) {
		error.message = "User activation failed";
		next(error);
	}
};
