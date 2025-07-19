import { NextFunction, Response } from "express";
import { FilterQuery } from "mongoose";
import * as Yup from "yup";

import { IReqUser } from "../utils/interface";
import { orderDAO, OrderModel, OrderStatus, TOrder, TVoucher } from "../models/order.model";
import { TicketModel } from "../models/ticket.model";
import response from "../utils/response";
import { getId } from "../utils/identifier";

export const create = async (req: IReqUser, res: Response, next: NextFunction) => {
	try {
		const userId = req.user?.id;
		const payload = {
			...req.body,
			createdBy: userId
		} as TOrder;

		await orderDAO.validate(payload);

		const ticket = await TicketModel.findById(payload.ticket);

		if (!ticket)
			return response.error(
				res,
				{
					message: "Ticket not found",
					status: 404
				},
				null
			);
		if (ticket.quantity < payload.quantity)
			return response.error(
				res,
				{
					message: "Ticket quantity is not enough",
					status: 400
				},
				null
			);

		const total: number = +ticket?.price * +payload.quantity;

		Object.assign(payload, {
			...payload,
			total
		});

		const result = await OrderModel.create(payload);
		response.success(res, result, "Order successfully created");
	} catch (error: any) {
		error.message = "Failed to create an order";
		next(error);
	}
};
export const findAll = async (req: IReqUser, res: Response, next: NextFunction) => {
	try {
		const { page = 1, limit = 10, search } = req.query;

		const buildQuery = (filter: any) => {
			const query: FilterQuery<Yup.InferType<typeof orderDAO>> = {};

			if (filter.search) query.$text = { $search: filter.search };

			return query;
		};

		if ((typeof page === "string" && !parseInt(page)) || (typeof limit === "string" && !parseInt(limit))) {
			return response.error(res, { message: "Invalid query parameters", status: 400 }, null);
		}

		const query = buildQuery({ search });

		const result = await OrderModel.find(query)
			.limit(+limit)
			.skip((+page - 1) * +limit)
			.sort({ createdAt: -1 })
			.lean()
			.exec();

		const count = await OrderModel.countDocuments(query);

		response.pagination(
			res,
			result,
			{
				total: count,
				totalPages: Math.ceil(count / +limit),
				current: +page
			},
			"Success to get all orders"
		);
	} catch (error: any) {
		error.message = "Failed to get all orders";
		next(error);
	}
};
export const findOne = async (req: IReqUser, res: Response, next: NextFunction) => {
	try {
		const { orderId } = req.params;
		const result = await OrderModel.findOne({ orderId });

		if (!result) return response.error(res, { message: "Order not found", status: 404 }, null);

		response.success(res, result, "Success get one order");
	} catch (error: any) {
		error.message = "Failed to get one order";
		next(error);
	}
};
export const findAllByMember = async (req: IReqUser, res: Response, next: NextFunction) => {
	try {
		const { page = 1, limit = 10, search } = req.query;
		const userId = req.user?.id;

		const buildQuery = (filter: any) => {
			const query: FilterQuery<Yup.InferType<typeof orderDAO>> = {
				createdBy: userId
			};

			if (filter.search) query.$text = { $search: filter.search };

			return query;
		};

		if ((typeof page === "string" && !parseInt(page)) || (typeof limit === "string" && !parseInt(limit))) {
			return response.error(res, { message: "Invalid query parameters", status: 400 }, null);
		}

		const query = buildQuery({ search });

		const result = await OrderModel.find(query)
			.limit(+limit)
			.skip((+page - 1) * +limit)
			.sort({ createdAt: -1 })
			.lean()
			.exec();

		const count = await OrderModel.countDocuments(query);

		response.pagination(
			res,
			result,
			{
				total: count,
				totalPages: Math.ceil(count / +limit),
				current: +page
			},
			"Success to get all orders"
		);
	} catch (error: any) {
		error.message = "Failed to get all orders";
		next(error);
	}
};
export const remove = async (req: IReqUser, res: Response, next: NextFunction) => {
	try {
		const { orderId } = req.params;
		const result = await OrderModel.findOneAndDelete({ orderId }, { new: true });

		if (!result) return response.error(res, { message: "Order not found", status: 404 }, null);

		response.success(res, null, "Success deleting an order");
	} catch (error: any) {
		error.message = "Failed to delete an order";
		next(error);
	}
};

export const pending = async (req: IReqUser, res: Response, next: NextFunction) => {
	try {
		const { orderId } = req.params;
		const userId = req.user?.id;

		const order = await OrderModel.findOne({ orderId, createdBy: userId });

		if (!order) return response.error(res, { message: "Order not found", status: 404 }, null);

		if (order.status === OrderStatus.COMPLETED)
			return response.error(res, { message: "Order has been completed", status: 409 }, null);

		if (order.status === OrderStatus.PENDING)
			return response.error(res, { message: "Order is currently pending", status: 409 }, null);

		const result = await OrderModel.findOneAndUpdate(
			{ orderId, createdBy: userId },
			{ status: OrderStatus.PENDING },
			{ new: true }
		);

		response.success(res, result, "Success pending an order");
	} catch (error: any) {
		error.message = "Failed to pending an order";
		next(error);
	}
};
export const complete = async (req: IReqUser, res: Response, next: NextFunction) => {
	try {
		const { orderId } = req.params;
		const userId = req.user?.id;

		const order = await OrderModel.findOne({ orderId, createdBy: userId });

		if (!order) return response.error(res, { message: "Order not found", status: 404 }, null);

		if (order.status === OrderStatus.COMPLETED)
			return response.error(res, { message: "Order has been completed", status: 409 }, null);

		const vouchers: TVoucher[] = Array.from(
			{ length: order.quantity },
			() =>
				({
					voucherId: getId("voucher"),
					isPrint: false
				}) as TVoucher
		);

		const result = await OrderModel.findOneAndUpdate(
			{ orderId, createdBy: userId },
			{ vouchers, status: OrderStatus.COMPLETED },
			{ new: true }
		);

		const ticket = await TicketModel.findById(order.ticket);

		if (!ticket) return response.error(res, { message: "Ticket not found", status: 404 }, null);

		await TicketModel.updateOne(
			{
				_id: ticket._id
			},
			{
				// quantity: ticket.quantity - order.quantity
				$inc: { quantity: -order.quantity } // Uncomment the above line if this line occurs an error
			}
		);

		response.success(res, result, "Success completing an order");
	} catch (error: any) {
		error.message = "Failed to complete an order";
		next(error);
	}
};
export const cancelled = async (req: IReqUser, res: Response, next: NextFunction) => {
	try {
		const { orderId } = req.params;
		const userId = req.user?.id;

		const order = await OrderModel.findOne({ orderId, createdBy: userId });

		if (!order) return response.error(res, { message: "Order not found", status: 404 }, null);

		if (order.status === OrderStatus.COMPLETED)
			return response.error(res, { message: "Order has been completed", status: 409 }, null);

		if (order.status === OrderStatus.CANCELLED)
			return response.error(res, { message: "Order has been cancelled", status: 409 }, null);

		const result = await OrderModel.findOneAndUpdate(
			{ orderId, createdBy: userId },
			{ status: OrderStatus.CANCELLED },
			{ new: true }
		);

		response.success(res, result, "Success cancelling an order");
	} catch (error: any) {
		error.message = "Failed to cancel an order";
		next(error);
	}
};
