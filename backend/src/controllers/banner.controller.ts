import { NextFunction, Response } from "express";
import { FilterQuery } from "mongoose";
import * as Yup from "yup";

import { IPaginationQuery, IReqUser } from "../utils/interface";
import { bannerDAO, BannerModel } from "../models/banner.model";
import response from "../utils/response";

export const create = async (req: IReqUser, res: Response, next: NextFunction) => {
	try {
		await bannerDAO.validate(req.body);
		const result = await BannerModel.create(req.body);
		response.success(res, result, "Banner successfully created");
	} catch (error: any) {
		error.message = "Failed to create a banner";
		next(error);
	}
};
export const findAll = async (req: IReqUser, res: Response, next: NextFunction) => {
	try {
		const { page = 1, limit = 10, search } = req.query as unknown as IPaginationQuery;

		const query: FilterQuery<Yup.InferType<typeof bannerDAO>> = {};

		if (search) {
			Object.assign(query, {
				...query,
				$text: {
					$search: search
				}
			});
		}

		const result = await BannerModel.find(query)
			.limit(+limit)
			.skip((+page - 1) * +limit)
			.sort({ createdAt: -1 })
			.exec();

		const count = await BannerModel.countDocuments(query);

		response.pagination(
			res,
			result,
			{
				total: count,
				totalPages: Math.ceil(count / +limit),
				current: +page
			},
			"Success get all banners"
		);
	} catch (error: any) {
		error.message = "Failed to get all banners";
		next(error);
	}
};
export const findOne = async (req: IReqUser, res: Response, next: NextFunction) => {
	try {
		const { id } = req.params;
		const result = await BannerModel.findById(id);
		response.success(res, result, "Success get one banner");
	} catch (error: any) {
		error.message = "Failed to get one banner";
		next(error);
	}
};
export const update = async (req: IReqUser, res: Response, next: NextFunction) => {
	try {
		const { id } = req.params;
		const result = await BannerModel.findByIdAndUpdate(id, req.body, { new: true });
		response.success(res, result, "Banner successfully updated");
	} catch (error: any) {
		error.message = "Failed to update one banner";
		next(error);
	}
};
export const remove = async (req: IReqUser, res: Response, next: NextFunction) => {
	try {
		const { id } = req.params;
		const result = await BannerModel.findByIdAndDelete(id, { new: true });
		response.success(res, result, "Banner successfully deleted");
	} catch (error: any) {
		error.message = "Failed to delete one banner";
		next(error);
	}
};
