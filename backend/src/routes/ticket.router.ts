import express from "express";

import aclMiddleware from "../middlewares/acl.middleware";
import { authenticate } from "../middlewares/auth.middleware";
import { ROLES } from "../utils/constant";
import { create, findAll, findOne, update, remove, findAllByEvent } from "../controllers/ticket.controller";

const router = express.Router();

router.post(
	"/tickets",
	[authenticate, aclMiddleware([ROLES.ADMIN])],
	create
	/**
      #swagger.tags = ["Tickets"]
      #swagger.security = [{
        "bearerAuth": []
      }]
      #swagger.requestBody = {
        required: true,
        schema: {
          $ref: "#/components/schemas/CreateTicketRequest"
        }
      }
     */
);
router.get(
	"/tickets",
	findAll
	/**
      #swagger.tags = ["Tickets"]
     */
);
router.get(
	"/tickets/:id",
	findOne
	/**
      #swagger.tags = ["Tickets"]
     */
);
router.put(
	"/tickets/:id",
	[authenticate, aclMiddleware([ROLES.ADMIN])],
	update
	/**
      #swagger.tags = ["Tickets"]
      #swagger.security = [{
        "bearerAuth": []
      }]
      #swagger.requestBody = {
        required: true,
        schema: {
          $ref: "#/components/schemas/CreateTicketRequest"
        }
      }
     */
);
router.delete(
	"/tickets/:id",
	[authenticate, aclMiddleware([ROLES.ADMIN])],
	remove
	/**
      #swagger.tags = ["Tickets"]
      #swagger.security = [{
        "bearerAuth": []
      }]
     */
);
router.get(
	"/tickets/:eventId/events",
	findAllByEvent
	/**
      #swagger.tags = ["Tickets"]
     */
);

export default router;
