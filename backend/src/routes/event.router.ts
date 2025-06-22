import express from "express";
import { authenticate } from "../middlewares/auth.middleware";
import aclMiddleware from "../middlewares/acl.middleware";
import { ROLES } from "../utils/constant";
import { create, findAll, findOne, findOneBySlug, remove, update } from "../controllers/event.controller";

const router = express.Router();

router.post(
	"/events",
	[authenticate, aclMiddleware([ROLES.ADMIN])],
	create
	/**
      #swagger.tags = ["Events"]
      #swagger.security = [{
        "bearerAuth": []
      }]
      #swagger.requestBody = {
        required: true,
        schema: {
          $ref: "#/components/schemas/CreateEventRequest"
        }
      }
     */
);
router.get(
	"/events",
	findAll
	/**
	  #swagger.tags = ["Events"]
	 */
);
router.get(
	"/events/:id",
	findOne
	/**
	  #swagger.tags = ["Events"]
	 */
);
router.put(
	"/events/:id",
	[authenticate, aclMiddleware([ROLES.ADMIN])],
	update
	/**
      #swagger.tags = ["Events"]
      #swagger.security = [{
        "bearerAuth": []
      }]
      #swagger.requestBody = {
        required: true,
        schema: {
          $ref: "#/components/schemas/CreateEventRequest"
        }
      }
     */
);
router.delete(
	"/events/:id",
	[authenticate, aclMiddleware([ROLES.ADMIN])],
	remove
	/**
      #swagger.tags = ["Events"]
      #swagger.security = [{
        "bearerAuth": []
      }]
     */
);
router.get(
	"/events/:slug/slug",
	findOneBySlug
	/**
	  #swagger.tags = ["Events"]
	 */
);

export default router;
