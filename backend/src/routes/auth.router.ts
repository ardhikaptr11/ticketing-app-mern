import express, { Request, Response } from "express";
import { register, login, me, activation } from "../controllers/auth.controller";
import { authenticate } from "../middlewares/auth.middleware";
import aclMiddleware from "../middlewares/acl.middleware";
import { ROLES } from "../utils/constant";

const router = express.Router();

router.post("/auth/register", register);
router.post("/auth/login", login);
router.get("/auth/me", authenticate, me);
router.post("/auth/activation", activation);

router.get("/test-acl", [authenticate, aclMiddleware([ROLES.ADMIN, ROLES.MEMBER])], (req: Request, res: Response) => {
	res.status(200).json({
		code: 200,
		data: "success",
		message: "OK"
	});
});

export default router;
