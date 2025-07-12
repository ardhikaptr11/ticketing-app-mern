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
    #swagger.parameters['page'] = {
      in: 'query',
      required: false,
      type: 'integer',
      default: 1
    }
    #swagger.parameters['limit'] = {
      in: 'query',
      required: false,
      type: 'integer',
      default: 10
    }
	  #swagger.parameters['isFeatured'] = {
		  in: 'query',
		  required: false,
		  type: 'boolean',
		  enum: ['true', 'false']
	  }
	  #swagger.parameters['isPublished'] = {
		  in: 'query',
		  required: false,
		  type: 'boolean',
		  enum: ['true', 'false']
	  }
	  #swagger.parameters['isOnline'] = {
		  in: 'query',
		  required: false,
		  type: 'boolean',
		  enum: ['true', 'false']
	  }
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
