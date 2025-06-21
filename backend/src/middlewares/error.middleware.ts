import { Request, Response, NextFunction } from "express";
import { MulterError } from "multer";
import response from "../utils/response";
import { CustomMulterError } from "../utils/interface";

export const globalError = (error: Error, req: Request, res: Response, _next: NextFunction) => {
	console.error(error);

	return response.error(res, { message: error.message }, error);
};

export const checkUploadError = (error: Error, req: Request, res: Response, next: NextFunction) => {
	if (!error) return next();

	if (error instanceof MulterError) {
		(error as CustomMulterError).status = 400;

		const code = (error as CustomMulterError).code;

		switch (code) {
			case "LIMIT_FILE_SIZE":
				error.message = "Uploaded file size exceeds 5MB limit";
				break;
			case "LIMIT_UNEXPECTED_FILE":
				error.message = `Received field name is '${(error as CustomMulterError).field}' instead of 'image'`;
				break;
			case "MISSING_FIELD_NAME":
				error.message = "Field name is missing";
				break;
		}
	}

	return next(error);
};
