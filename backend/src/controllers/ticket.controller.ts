import { Response, NextFunction } from "express";
import { FilterQuery, isValidObjectId } from "mongoose";
import * as Yup from "yup";

import { IPaginationQuery, IReqUser } from "../utils/interface";
import { ticketDAO, TicketModel } from "../models/ticket.model";
import response from "../utils/response";

export const create = async (req: IReqUser, res: Response, next: NextFunction) => {
	try {
		await ticketDAO.validate(req.body);
		const result = await TicketModel.create(req.body);
		response.success(res, result, "Ticket successfully created");
	} catch (error: any) {
		error.message = "Failed to create a ticket";
		next(error);
	}
};

export const findAll = async (req: IReqUser, res: Response, next: NextFunction) => {
	try {
		const { page = 1, limit = 10, search } = req.query as unknown as IPaginationQuery;

		const query: FilterQuery<Yup.InferType<typeof ticketDAO>> = {};

		if (search) {
			Object.assign(query, {
				...query,
				$text: {
					$search: search
				}
			});
		}

		const result = await TicketModel.find(query)
			.populate("events")
			.limit(+limit)
			.skip((+page - 1) * +limit)
			.sort({ createdAt: -1 })
			.exec();

		const count = await TicketModel.countDocuments(query);

		response.pagination(
			res,
			result,
			{
				total: count,
				totalPages: Math.ceil(count / +limit),
				current: +page
			},
			"Success get all tickets"
		);
	} catch (error: any) {
		error.message = "Failed to get all tickets";
		next(error);
	}
};

export const findOne = async (req: IReqUser, res: Response, next: NextFunction) => {
	try {
		const { id } = req.params;

		if (!isValidObjectId(id)) return response.error(res, { message: "Ticket not found", status: 404 });

		const result = await TicketModel.findById(id);

		if (!result) return response.error(res, { message: "Ticket not found", status: 404 });

		response.success(res, result, "Success get one ticket");
	} catch (error: any) {
		error.message = "Failed to get one ticket";
		next(error);
	}
};

export const update = async (req: IReqUser, res: Response, next: NextFunction) => {
	try {
		const { id } = req.params;

		if (!isValidObjectId(id))
			return response.error(res, { message: "Failed to update ticket. Ticket not found", status: 404 });

		const result = await TicketModel.findByIdAndUpdate(id, req.body, { new: true });
		response.success(res, result, "Ticket successfully updated");
	} catch (error: any) {
		error.message = "Failed to update ticket";
		next(error);
	}
};

export const remove = async (req: IReqUser, res: Response, next: NextFunction) => {
	try {
		const { id } = req.params;

		if (!isValidObjectId(id))
			return response.error(res, { message: "Failed to delete ticket. Ticket not found", status: 404 });

		const result = await TicketModel.findByIdAndDelete(id, { new: true });
		response.success(res, result, "Ticket successfully deleted");
	} catch (error: any) {
		error.message = "Failed to delete one ticket";
		next(error);
	}
};

export const findAllByEvent = async (req: IReqUser, res: Response, next: NextFunction) => {
	try {
		const { eventId } = req.params;

		if (!isValidObjectId(eventId)) {
			return response.error(res, { message: "Tickets not found", status: 404 });
		}

		const result = await TicketModel.find({ events: eventId }).exec();
		response.success(res, result, "Success to get all tickets by an event ");
	} catch (error: any) {
		error.message = "Failed to get all tickets by an event";
		next(error);
	}
};
