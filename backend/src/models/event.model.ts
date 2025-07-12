import mongoose from "mongoose";
import * as Yup from "yup";

import { Event } from "../utils/interface";

const Schema = mongoose.Schema;

export const eventDAO = Yup.object({
	name: Yup.string().required("Event name is required"),
	slug: Yup.string(),
	category: Yup.string().required("Category is required"),
	startDate: Yup.string().required("Start date is required"),
	endDate: Yup.string().required("End date is required"),
	isPublished: Yup.boolean().required("Publish status is required"),
	isFeatured: Yup.boolean().required("Featured status is required"),
	isOnline: Yup.boolean().required("Online status is required"),
	description: Yup.string().required("Event description is required"),
	location: Yup.object()
		.shape({
			region: Yup.number().required("Region id is required"),
			coordinates: Yup.array().required("Location coordinates are required"),
			address: Yup.string().required("Address is required")
		})
		.required("Event location is required"),
	banner: Yup.string().required("Event banner is required"),
	createdBy: Yup.string().required("Created by is required"),
	createdAt: Yup.string(),
	updatedAt: Yup.string()
});

const LocationSchema = new Schema({
	region: {
		type: Schema.Types.Number,
		required: true
	},
	coordinates: {
		type: [Schema.Types.Number],
		default: [0, 0]
	},
	address: {
		type: Schema.Types.String,
		required: true
	}
});

const EventSchema = new Schema<Event>(
	{
		name: {
			type: Schema.Types.String,
			required: true
		},
		slug: {
			type: Schema.Types.String,
			slug: "name",
			unique: true
		},
		description: {
			type: Schema.Types.String,
			required: true
		},
		location: {
			type: LocationSchema,
			required: true
		},
		banner: {
			type: Schema.Types.String,
			required: true
		},
		isFeatured: {
			type: Schema.Types.Boolean,
			required: true
		},
		isOnline: {
			type: Schema.Types.Boolean,
			required: true
		},
		isPublished: {
			type: Schema.Types.Boolean,
			default: false
		},
		category: {
			type: Schema.Types.ObjectId,
			required: true,
			ref: "Category"
		},
		createdBy: {
			type: Schema.Types.ObjectId,
			required: true,
			ref: "User"
		},
		createdAt: {
			type: Schema.Types.String,
			default: Date.now
		},
		updatedAt: {
			type: Schema.Types.String,
			default: Date.now
		},
		startDate: {
			type: Schema.Types.String,
			required: true
		},
		endDate: {
			type: Schema.Types.String,
			required: true
		}
	},
	{
		timestamps: true
	}
);

EventSchema.index({ name: "text", description: "text" });

EventSchema.pre("save", function () {
	const event = this;
	if (!event.slug) {
		event.slug = event.name.toLowerCase().replace(/ /g, "-");
	}
});

export const EventModel = mongoose.model<Event>("Event", EventSchema);
