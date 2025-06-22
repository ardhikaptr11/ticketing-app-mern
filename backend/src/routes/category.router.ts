import express from "express";
import { create, findAll, findOne, update, remove } from "../controllers/category.controller";
import { authenticate } from "../middlewares/auth.middleware";
import aclMiddleware from "../middlewares/acl.middleware";
import { ROLES } from "../utils/constant";

const router = express.Router();

router.post(
	"/category",
	[authenticate, aclMiddleware([ROLES.ADMIN])],
	create
	/**
      #swagger.tags = ["Category"]
      #swagger.security = [{
        "bearerAuth": []
      }]
      #swagger.requestBody = {
        required: true,
        schema: {
          $ref: "#/components/schemas/CreateCategoryRequest"
        }
      }
     */
);
router.get(
    "/category", 
    findAll
    /**
      #swagger.tags = ["Category"]
     */
);
router.get(
	"/category/:id",
	findOne
	/**
      #swagger.tags = ["Category"]
     */
);
router.put(
	"/category/:id",
	[authenticate, aclMiddleware([ROLES.ADMIN])],
	update
	/**
      #swagger.tags = ["Category"]
      #swagger.security = [{
        "bearerAuth": []
      }]
      #swagger.requestBody = {
        required: true,
        schema: {
          $ref: "#/components/schemas/CreateCategoryRequest"
        }
      }
     */
);
router.delete(
	"/category/:id",
	[authenticate, aclMiddleware([ROLES.ADMIN])],
	remove
	/**
      #swagger.tags = ["Category"]
      #swagger.security = [{
        "bearerAuth": []
      }]
     */
);

export default router;
