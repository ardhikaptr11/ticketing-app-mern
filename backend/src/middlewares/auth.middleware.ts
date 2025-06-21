import { Request, Response, NextFunction } from "express";
import { getUserData } from "../utils/jwt";
import { IReqUser } from "../utils/interface";
import response from "../utils/response";

export const authenticate = (req: Request, res: Response, next: NextFunction) => {
	const authHeader = req.get("Authorization");

	if (!authHeader) {
		return response.authError(res, 401, "Authentication token is required");
	}

	const [prefix, token] = authHeader.trim().split(" ");

	if ((prefix !== "Bearer" && token) || authHeader.split(" ").length > 2) {
		return response.authError(res, 401, "Invalid token");
	}

	const user = getUserData(token);

	if (!user) {
		return response.authError(res, 401, "Invalid token");
	}

	(req as IReqUser).user = user;

	next();
};
