import { Response, NextFunction } from "express";
import { IReqUser } from "../utils/interface";
import response from "../utils/response";

export default (roles: string[]) => {
	return (req: IReqUser, res: Response, next: NextFunction) => {
		const role = req.user?.role;

		if (!role || !roles.includes(role)) {
			return response.authError(res, 403, "Unauthorized role access");
		}

        next()
	};
};
