// const cloudinary = require("cloudinary").v2;

import { v2 as cloudinary } from "cloudinary";
import { CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET, CLOUDINARY_CLOUD_NAME } from "./env";

cloudinary.config({
	cloud_name: CLOUDINARY_CLOUD_NAME,
	api_key: CLOUDINARY_API_KEY,
	api_secret: CLOUDINARY_API_SECRET
});

const toDataURL = (file: Express.Multer.File): string => {
	const base64 = Buffer.from(file.buffer).toString("base64");

	const dataURL = `data:${file.mimetype};base64,${base64}`;

	return dataURL;
};

const getPublicIdFromFileURL = (fileURL: string): string => {
	const fileNameUsingSubstring = fileURL.substring(fileURL.lastIndexOf("/") + 1);

	const publicId = fileNameUsingSubstring.substring(0, fileNameUsingSubstring.indexOf("."));

	return publicId;
};

export const uploadSingle = async (file: Express.Multer.File) => {
	const fileDataURL = toDataURL(file);

	const result = await cloudinary.uploader.upload(fileDataURL, {
		resource_type: "auto",
		folder: "zentix-uploads"
	});

	return result;
};

export const uploadMultiple = async (files: Express.Multer.File[]) => {
	const batchUpload = files.map(async (file) => {
		const result = await uploadSingle(file);

		return result;
	});

	const results = await Promise.all(batchUpload);

	return results;
};

export const deleteFromCloudinary = async (fileURL: string) => {
	const publicId = getPublicIdFromFileURL(fileURL);
	const result = await cloudinary.uploader.destroy(`zentix-uploads/${publicId}`);

	return result;
};
