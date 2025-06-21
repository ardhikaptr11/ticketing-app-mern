import { NextFunction, Response } from "express";
import { IPaginationQuery, IReqUser } from "../utils/interface";
import { categoryDAO, CategoryModel } from "../models/category.model";
import response from "../utils/response";

export const create = async (req: IReqUser, res: Response, next: NextFunction) => {
	try {
		await categoryDAO.validate(req.body);

		const result = await CategoryModel.create(req.body);
		response.success(res, result, "Category successfully created");
	} catch (error: any) {
		error.message = "Failed to create category";
		next(error);
	}
};

export const findAll = async (req: IReqUser, res: Response, next: NextFunction) => {
	const { page = 1, limit = 10, search } = req.query as unknown as IPaginationQuery;

	try {
		const query = {};

		if (search) {
			Object.assign(query, {
				$or: [
					{
						name: { $regex: search, $options: "i" }
					},
					{
						description: { $regex: search, $options: "i" }
					}
				]
			});
		}

		const result = await CategoryModel.find(query)
			.limit(limit)
			.skip((page - 1) * limit)
			.sort({ createdAt: -1 })
			.exec();

		const count = await CategoryModel.countDocuments(query);

		response.pagination(
			res,
			result,
			{
				total: count,
				totalPages: Math.ceil(count / limit),
				current: page
			},
			"Success find all category"
		);
	} catch (error: any) {
		error.message = "Failed to find all category";
		next(error);
	}
};

export const findOne = async (req: IReqUser, res: Response, next: NextFunction) => {
	try {
		const { id } = req.params;
		const result = await CategoryModel.findById(id);
		response.success(res, result, "Success find one category");
	} catch (error: any) {
		error.message = "Failed to find one category";
		next(error);
	}
};

export const update = async (req: IReqUser, res: Response, next: NextFunction) => {
	try {
		const { id } = req.params;
		const result = await CategoryModel.findByIdAndUpdate(id, req.body, { new: true });
		response.success(res, result, "Category successfully updated");
	} catch (error: any) {
		error.message = "Failed to update category";
		next(error);
	}
};

export const remove = async (req: IReqUser, res: Response, next: NextFunction) => {
	try {
		const { id } = req.params;
		const result = await CategoryModel.findByIdAndDelete(id);
		response.success(res, result, "Category successfully removed");
	} catch (error: any) {
		error.message = "Failed to remove category";
		next(error);
	}
};
