import { NextFunction, Request, Response } from "express";
import response from "../utils/response";
import { RegionModel } from "../models/region.model";
import axios from "axios";
import { GOOGLE_API_KEY, GOOGLE_GEOCODE_API_URL } from "../utils/env";

export const findByCity = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const { name } = req.query;
		const result = await RegionModel.findByCity(`${name}`);
		response.success(res, result, "Success get region by city name");
	} catch (error: any) {
		error.message = "Failed to get region by city name";
		next(error);
	}
};

export const getAllProvinces = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const result = await RegionModel.getAllProvinces();
		response.success(res, result, "Success get all provinces");
	} catch (error: any) {
		error.message = "Failed to get all provinces";
	}
};

export const getProvince = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const { id } = req.params;
		const result = await RegionModel.getProvince(Number(id));
		response.success(res, result, "Success get a province");
	} catch (error: any) {
		error.message = "Failed to get province";
		next(error);
	}
};

export const getRegency = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const { id } = req.params;
		const result = await RegionModel.getRegency(Number(id));
		response.success(res, result, "Success get regencies");
	} catch (error: any) {
		error.message = "Failed to get regency";
		next(error);
	}
};

export const getDistrict = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const { id } = req.params;
		const result = await RegionModel.getDistrict(Number(id));
		response.success(res, result, "Success get districts");
	} catch (error: any) {
		error.message = "Failed to get district";
		next(error);
	}
};

export const getVillage = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const { id } = req.params;
		const result = await RegionModel.getVillage(Number(id));
		response.success(res, result, "Success get villages");
	} catch (error: any) {
		error.message = "Failed to get village";
		next(error);
	}
};
export const getGeolocationByCity = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const { name } = req.params;

		const result = await axios.get(
			`${GOOGLE_GEOCODE_API_URL}/${encodeURIComponent(name as string)}?key=${GOOGLE_API_KEY}`
		);

		response.success(res, result.data, "Geolocation successfully retrieved");
	} catch (error: any) {
		error.message = "Failed to get geolocation for the city";
		next(error);
	}
};
