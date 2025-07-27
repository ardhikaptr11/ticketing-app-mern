import express from "express";

import { create, findAll, findOne, update, remove } from "../controllers/banner.controller";
import { authenticate } from "../middlewares/auth.middleware";
import aclMiddleware from "../middlewares/acl.middleware";
import { ROLES } from "../utils/constant";

const router = express.Router();

router.post(
	"/banners",
	[authenticate, aclMiddleware([ROLES.ADMIN])],
	create
	/**
      #swagger.tags = ['Banners']
      #swagger.security = [{
        "bearerAuth": []
      }]
      #swagger.requestBody = {
        required: true,
        schema: {
          $ref: "#/components/schemas/CreateBannerRequest"
        }
      }
     */
);
router.get(
	"/banners",
	findAll
	/**
    #swagger.tags = ['Banners']
    #swagger.parameters['isShow'] = {
	    in: 'query',
	    required: false,
	    type: 'boolean',
	    enum: ['true', 'false']
	  }
  */
);
router.get(
	"/banners/:id",
	findOne
	/**
      #swagger.tags = ["Banners"]
     */
);
router.put(
	"/banners/:id",
	[authenticate, aclMiddleware([ROLES.ADMIN])],
	update
	/**
      #swagger.tags = ["Banners"]
      #swagger.security = [{
        "bearerAuth": []
      }]
      #swagger.requestBody = {
        required: true,
        schema: {
          $ref: "#/components/schemas/CreateBannerRequest"
        }
      }
     */
);
router.delete(
	"/banners/:id",
	[authenticate, aclMiddleware([ROLES.ADMIN])],
	remove
	/**
      #swagger.tags = ["Banners"]
      #swagger.security = [{
        "bearerAuth": []
      }]
     */
);

export default router;
