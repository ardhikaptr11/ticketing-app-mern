import mongoose, { Schema } from "mongoose";
import * as Yup from "yup";
import { Banner } from "../utils/interface";

export const BANNER_MODEL_NAME = "Banner";

export const bannerDAO = Yup.object({
	title: Yup.string().required("Title is required"),
	image: Yup.string().required("Image is required"),
	isShow: Yup.boolean().required("Show status is required")
});

const BannerSchema = new mongoose.Schema<Banner>(
	{
		title: {
			type: Schema.Types.String,
			required: true
		},
		image: {
			type: Schema.Types.String,
			required: true
		},
		isShow: {
			type: Schema.Types.Boolean,
			required: true
		}
	},
	{
		timestamps: true
	}
).index({ title: "text", isShow: "text" });

export const BannerModel = mongoose.model<Banner>(BANNER_MODEL_NAME, BannerSchema);
