import { NextFunction, Request, Response } from "express";
import { string, object, ref } from "yup";

import { UserModel } from "../models/user.model";
import { encrypt } from "../utils/encryption";
import { generateToken } from "../utils/jwt";
import { IReqUser } from "../middlewares/auth.middleware";

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

export const register = async (req: Request, res: Response) => {
	/**
	  #swagger.tags = ["Authentication"]
	  #swagger.requestBody = {
	    required: true,
	    schema: {$ref: "#components/schemas/RegisterRequest"}
	  }
	 */
	const { fullName, username, email, password, confirmPassword } = req.body as unknown as TRegister;

	try {
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

		return res.status(200).json({
			status: "success",
			message: "User registered successfully!",
			data: result
		});
	} catch (error) {
		const err = error as unknown as Error;
		return res.status(400).json({
			status: "error",
			message: err.message,
			data: null
		});
	}
};

export const login = async (req: Request, res: Response) => {
	/**
	  #swagger.tags = ["Authentication"]
      #swagger.requestBody = {
	     required: true,
	     schema: {$ref: "#/components/schemas/LoginRequest"}
	  }
	*/
	const { identifier, password } = req.body as unknown as TLogin;

	try {
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
			return res.status(404).json({
				code: 404,
				message: "User not found",
				data: null
			});
		}

		const isPasswordValid: boolean = encrypt(password) === userByIdentifier.password;

		if (!isPasswordValid) {
			return res.status(401).json({
				code: 401,
				message: "Invalid password",
				data: null
			});
		}

		const token = generateToken({
			id: userByIdentifier._id,
			role: userByIdentifier.role
		});

		res.status(200).json({
			code: 200,
			message: "Login success!",
			data: token
		});
	} catch (error) {
		const err = error as unknown as Error;
		return res.status(400).json({
			code: 400,
			message: err.message,
			data: null
		});
	}
};

export const me = async (req: IReqUser, res: Response) => {
	/**
	  #swagger.tags = ["Authentication"]
	  #swagger.security = [{ bearerAuth: [] }]
	 */
	const user = req.user;

	try {
		const result = await UserModel.findById(user?.id);

		res.status(200).json({
			code: 200,
			message: "Succes get user profile",
			data: result
		});
	} catch (error) {
		const err = error as unknown as Error;

		res.status(400).json({
			code: 400,
			message: err.message,
			data: null
		});
	}
};

export const activation = async (req: Request, res: Response) => {
	/**
	  #swagger.tags = ["Authentication"]
	  #swagger.requestBody = {
	    required: true,
	    schema: {$ref: "#components/schemas/ActivationRequest"}
	  }
	 */
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

		res.status(200).json({
			code: 200,
			message: "User successfully activated",
			data: result
		});
	} catch (error) {
		const err = error as unknown as Error;

		res.status(400).json({
			code: 400,
			message: err.message,
			data: null
		});
	}
};
