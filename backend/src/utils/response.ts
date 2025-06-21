import { Response } from "express";
import { TokenExpiredError } from "jsonwebtoken";
import { MulterError } from "multer";

import { ValidationError } from "yup";
import { CustomMulterError } from "./interface";

type TPagination = {
	totalPages: number;
	current: number;
	total: number;
};

export default {
	success(res: Response, data: any, message: string) {
		res.status(200).json({
			meta: {
				status: 200,
				message
			},
			data
		});
	},
	error(res: Response, { message, status = 500 }: { message: string; status?: number }, error?: unknown) {
		if (error instanceof TokenExpiredError) {
			return this.authError(res, 401, "JWT is no longer valid");
		}

		if (error instanceof ValidationError) {
			return res.status(status).json({
				meta: {
					status,
					message
				},
				data: error.errors[0]
			});
		}

		if (error instanceof MulterError) {
            const status = (error as CustomMulterError).status
            
			return res.status(status).json({
				meta: {
					status,
					message
				},
				data: (error as CustomMulterError).code
			});
		}

		res.status(status).json({
			meta: {
				status,
				message
			},
			data: null
		});
	},
	authError(res: Response, statusCode: number, message: string = "Unauthorized") {
		res.status(statusCode).json({
			meta: {
				status: statusCode,
				message
			},
			data: null
		});
	},
	pagination(res: Response, data: any[], pagination: TPagination, message: string) {
		res.status(200).json({
			meta: {
				status: 200,
				message
			},
			data,
			pagination
		});
	}
};
