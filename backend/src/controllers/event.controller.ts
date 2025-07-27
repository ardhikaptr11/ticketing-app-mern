import { Response, NextFunction } from "express";
import { FilterQuery, isValidObjectId } from "mongoose";
import * as Yup from "yup";

import { eventDAO, EventModel } from "../models/event.model";
import response from "../utils/response";
import { Event, IPaginationQuery, IReqUser } from "../utils/interface";

export const create = async (req: IReqUser, res: Response, next: NextFunction) => {
	try {
		const payload = { ...req.body, createdBy: req.user?.id } as Event;
		await eventDAO.validate(payload);
		const result = await EventModel.create(payload);
		response.success(res, result, "Event successfully created");
	} catch (error: any) {
		error.message = "Failed to create an event";
		next(error);
	}
};

export const findAll = async (req: IReqUser, res: Response, next: NextFunction) => {
	try {
		const { page = 1, limit = 10, search, category, isFeatured, isPublished, isOnline } = req.query;

		const buildQuery = (filter: any) => {
			const query: FilterQuery<Yup.InferType<typeof eventDAO>> = {};

			if (filter.search) {
				query.$or = [{ name: { $regex: search, $options: "i" } }];
			}
			if (filter.category) query.category = filter.category;
			if (filter.isFeatured) query.isFeatured = filter.isFeatured;
			if (filter.isPublished) query.isPublished = filter.isPublished;
			if (filter.isOnline) query.isOnline = filter.isOnline;

			return query;
		};

		if ((typeof page === "string" && !parseInt(page)) || (typeof limit === "string" && !parseInt(limit))) {
			return response.error(res, { message: "Invalid query parameters", status: 400 }, null);
		}

		const query = buildQuery({
			search,
			category,
			isFeatured,
			isPublished,
			isOnline
		});

		const result = await EventModel.find(query)
			.limit(+limit)
			.skip((+page - 1) * +limit)
			.sort({ createdAt: -1 })
			.lean()
			.exec();

		const count = await EventModel.countDocuments(query);

		response.pagination(
			res,
			result,
			{
				total: count,
				totalPages: Math.ceil(count / +limit),
				current: +page
			},
			"Success get all events"
		);
	} catch (error: any) {
		error.message = "Failed to get all events";
		next(error);
	}
};

export const findOne = async (req: IReqUser, res: Response, next: NextFunction) => {
	try {
		const { id } = req.params;

		if (!isValidObjectId(id)) return response.error(res, { message: "Event not found", status: 404 }, null);

		const result = await EventModel.findById(id);

		if (!result) return response.error(res, { message: "Event not found", status: 404 }, null);

		response.success(res, result, "Success get one event");
	} catch (error: any) {
		error.message = "Failed to get one event";
		next(error);
	}
};

export const update = async (req: IReqUser, res: Response, next: NextFunction) => {
	try {
		const { id } = req.params;

		if (!isValidObjectId(id))
			return response.error(res, { message: "Failed to update event. Event not found", status: 404 }, null);

		const result = await EventModel.findByIdAndUpdate(id, req.body, { new: true });
		response.success(res, result, "Event successfully updated");
	} catch (error: any) {
		error.message = "Failed to update an event";
		next(error);
	}
};

export const remove = async (req: IReqUser, res: Response, next: NextFunction) => {
	try {
		const { id } = req.params;

		if (!isValidObjectId(id))
			return response.error(res, { message: "Failed to delete event. Event not found", status: 404 }, null);

		const result = await EventModel.findByIdAndDelete(id, { new: true });
		response.success(res, result, "Event successfully deleted");
	} catch (error: any) {
		error.message = "Failed to delete one event";
		next(error);
	}
};

export const findOneBySlug = async (req: IReqUser, res: Response, next: NextFunction) => {
	try {
		const { slug } = req.params;
		const result = await EventModel.findOne({ slug });
		response.success(res, result, "Success get one event by its slug");
	} catch (error: any) {
		error.message = "Failed to get an event. Unknown slug";
		next(error);
	}
};
