import mongoose from "mongoose";
import * as Yup from "yup";

const Schema = mongoose.Schema;

// Data Access Object (DAO) for Category
export const categoryDAO = Yup.object({
	name: Yup.string().required("Category name is required"),
	description: Yup.string().required("Category description is required"),
	icon: Yup.string().required("Category icon is required")
});

export type Category = Yup.InferType<typeof categoryDAO>;

const CategorySchema = new Schema<Category>(
	{
		name: {
			type: Schema.Types.String,
			required: true
		},
		description: {
			type: Schema.Types.String,
			required: true
		},
		icon: {
			type: Schema.Types.String,
			required: true
		}
	},
	{
		timestamps: true
	}
).index({ name: "text", description: "text" });

export const CategoryModel = mongoose.model("Category", CategorySchema);
