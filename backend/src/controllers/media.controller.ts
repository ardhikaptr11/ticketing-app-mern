import { NextFunction, Response } from "express";

import { uploadSingle, uploadMultiple, deleteFromCloudinary } from "../utils/cloudinary";
import { IReqUser } from "../utils/interface";
import response from "../utils/response";

export const uploadSingleFile = async (req: IReqUser, res: Response, next: NextFunction) => {
	try {
		if (!req.file) return response.error(res, { message: "File does not exist", status: 400 }, null);

		const result = await uploadSingle(req.file as Express.Multer.File);

		response.success(res, result, "Files successfully uploaded");
	} catch (error: any) {
		error.message = "Failed to upload file";
		next(error);
	}
};
export const uploadMultipleFile = async (req: IReqUser, res: Response, next: NextFunction) => {
	try {
		if (!req.files || req.files.length === 0)
			return response.error(res, { message: "Files are not exist", status: 400 }, null);

		const result = await uploadMultiple(req.files as Express.Multer.File[]);

		response.success(res, result, "Files successfully uploaded");
	} catch (error: any) {
		error.message = "Failed to upload files";
		next(error);
	}
};
export const deleteFile = async (req: IReqUser, res: Response, next: NextFunction) => {
	try {
		const { fileURL } = req.body as { fileURL: string };

		const result = await deleteFromCloudinary(fileURL);

		return res.status(200).json({
			code: 200,
			message: "File successfully deleted",
			data: result
		});
	} catch (error: any) {
		error.message = "Failed to delete file";
		next(error);
	}
};
