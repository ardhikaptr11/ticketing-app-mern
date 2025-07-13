import mongoose, { Schema } from "mongoose";
import * as Yup from "yup";

import { EVENT_MODEL_NAME } from "./event.model";
import { Ticket } from "../utils/interface";

export const TICKET_MODEL_NAME = "Ticket";

export const ticketDAO = Yup.object({
	name: Yup.string().required("Name is required"),
	description: Yup.string().required("Description is required"),
	events: Yup.string().required("Event ID is required"),
	price: Yup.number().required("Price is required").min(0, "Price must be a positive number"),
	quantity: Yup.number().required("Quantity is required").min(1, "Quantity must be at least 1")
});

const TicketSchema = new Schema<Ticket>(
	{
		name: { type: Schema.Types.String, required: true },
		description: { type: Schema.Types.String, required: true },
		events: { type: Schema.Types.ObjectId, ref: EVENT_MODEL_NAME, required: true },
		price: { type: Schema.Types.Number, required: true, min: 0 },
		quantity: { type: Schema.Types.Number, required: true, min: 1 }
	},
	{
		timestamps: true
	}
).index({ name: "text" });

export const TicketModel = mongoose.model(TICKET_MODEL_NAME, TicketSchema);
