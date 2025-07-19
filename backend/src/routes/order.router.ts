import express from "express";
import {
	create,
	findAll,
	findOne,
	findAllByMember,
	remove,
	pending,
	complete,
	cancelled
} from "../controllers/order.controller";
import { authenticate } from "../middlewares/auth.middleware";
import aclMiddleware from "../middlewares/acl.middleware";
import { ROLES } from "../utils/constant";

const router = express.Router();

router.post(
	"/orders",
	[authenticate, aclMiddleware([ROLES.MEMBER])],
	create
	/**
      #swagger.tags = ["Orders"]
      #swagger.security = [{
        "bearerAuth": []
      }]
      #swagger.requestBody = {
        required: true,
        schema: {
          $ref: "#/components/schemas/CreateOrderRequest"
        }
      }
     */
);
router.get(
	"/orders",
	[authenticate, aclMiddleware([ROLES.ADMIN])],
	findAll
	/**
      #swagger.tags = ["Orders"]
      #swagger.security = [{
        "bearerAuth": []
      }]
     */
);
router.get(
	"/orders/:orderId",
	[authenticate, aclMiddleware([ROLES.ADMIN, ROLES.MEMBER])],
	findOne
	/**
      #swagger.tags = ["Orders"]
      #swagger.security = [{
        "bearerAuth": []
      }]
     */
);
router.get(
	"/orders-history",
	[authenticate, aclMiddleware([ROLES.MEMBER])],
	findAllByMember
	/**
      #swagger.tags = ["Orders"]
      #swagger.security = [{
        "bearerAuth": []
      }]
     */
);
router.delete(
	"/orders/:orderId",
	[authenticate, aclMiddleware([ROLES.ADMIN])],
	remove
	/**
      #swagger.tags = ["Orders"]
      #swagger.security = [{
        "bearerAuth": []
      }]
     */
);

router.put(
	"/orders/:orderId/pending",
	[authenticate, aclMiddleware([ROLES.ADMIN])],
	pending
	/**
      #swagger.tags = ["Orders"]
      #swagger.security = [{
        "bearerAuth": []
      }]
     */
);
router.put(
	"/orders/:orderId/completed",
	[authenticate, aclMiddleware([ROLES.MEMBER])],
	complete
	/**
      #swagger.tags = ["Orders"]
      #swagger.security = [{
        "bearerAuth": []
      }]
     */
);
router.put(
	"/orders/:orderId/cancelled",
	[authenticate, aclMiddleware([ROLES.ADMIN])],
	cancelled
	/**
      #swagger.tags = ["Orders"]
      #swagger.security = [{
        "bearerAuth": []
      }]
     */
);

export default router;
