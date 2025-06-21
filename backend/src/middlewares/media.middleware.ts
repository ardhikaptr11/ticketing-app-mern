import multer, { FileFilterCallback, MulterError } from "multer";
import path from "path";
import { Request } from "express";

const storage = multer.memoryStorage();

const fileFilter = (_req: Request, file: Express.Multer.File, cb: FileFilterCallback) => {
	const allowedTypes = /jpg|jpeg|png/;
	const extName = allowedTypes.test(path.extname(file.originalname).toLowerCase());
	const mimeType = allowedTypes.test(file.mimetype);

	if (extName && mimeType) {
		return cb(null, true);
	}

	const error = new Error("Only .jpg, .jpeg, and .png files are allowed");
	(error as any).code = 415;

	cb(error);
};

const upload = multer({
	storage,
	fileFilter,
	limits: { fileSize: 5 * 1024 * 1024 } // 5MB
});

export default {
	single(fieldName: string) {
		return upload.single(fieldName);
	},
	multiple(fieldName: string) {
		return upload.array(fieldName);
	}
};
