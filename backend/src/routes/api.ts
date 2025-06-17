import express from "express";
import { register, login, me, activation } from "../controllers/auth.controller";
import { authenticate } from "../middlewares/auth.middleware"

const router = express.Router();

router.post("/auth/register", register)
router.post("/auth/login", login)
router.get("/auth/me", authenticate, me)
router.post("/auth/activation", activation)

export default router;