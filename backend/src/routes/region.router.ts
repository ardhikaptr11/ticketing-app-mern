import express from "express";
import {
	findByCity,
	getAllProvinces,
	getDistrict,
	getProvince,
	getRegency,
	getVillage
} from "../controllers/region.controller";

const router = express.Router();

router.get(
	"/regions",
	getAllProvinces
	/**
	  #swagger.tags = ["Regions"]
	 */
);
router.get(
	"/regions/:id/province",
	getProvince
	/**
	  #swagger.tags = ["Regions"]
	 */
);
router.get(
	"/regions/:id/regency",
	getRegency
	/**
	  #swagger.tags = ["Regions"]
	 */
);
router.get(
	"/regions/:id/district",
	getDistrict
	/**
	  #swagger.tags = ["Regions"]
	 */
);
router.get(
	"/regions/:id/village",
	getVillage
	/**
	  #swagger.tags = ["Regions"]
	 */
);
router.get(
	"/regions-search",
	findByCity
	/**
	  #swagger.tags = ["Regions"]
	 */
);

export default router;
