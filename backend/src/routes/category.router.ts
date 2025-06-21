import express from "express";
import { create, findAll, findOne, update, remove } from "../controllers/category.controller";
import { authenticate } from "../middlewares/auth.middleware";
import aclMiddleware from "../middlewares/acl.middleware";
import { ROLES } from "../utils/constant";

const router = express.Router();

router.post("/category", [authenticate, aclMiddleware([ROLES.ADMIN])], create);
router.get("/category", findAll);
router.get("/category/:id", findOne);
router.put("/category/:id", [authenticate, aclMiddleware([ROLES.ADMIN])], update);
router.delete("/category/:id", [authenticate, aclMiddleware([ROLES.ADMIN])], remove);

export default router;
