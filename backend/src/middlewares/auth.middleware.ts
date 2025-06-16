import { Request, Response, NextFunction } from "express";
import { IUserToken, getUserData } from "../utils/jwt";

export interface IReqUser extends Request {
	user?: IUserToken;
}

export const authenticate = (req: Request, res: Response, next: NextFunction) => {
	const authHeader = req.headers.authorization;

	if (!authHeader) {
		return res.status(401).json({
			code: 401,
			message: "Authentication token is required",
			data: null
		});
	}

	const [prefix, token] = authHeader.split(" ");

	if ((prefix !== "Bearer" && token) || authHeader.split(" ").length > 2) {
		return res.status(401).json({
			code: 401,
			message: "Invalid token",
			data: null
		});
	}

	const user = getUserData(token);

	if (!user) {
		return res.status(404).json({
			code: 404,
			message: "Invalid token",
			data: null
		});
	}

	(req as IReqUser).user = user;

	next();
};
