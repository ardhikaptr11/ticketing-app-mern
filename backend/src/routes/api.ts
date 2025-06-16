import express from "express";
import { login, me, register } from "../controllers/auth.controller";
import { authenticate } from "../middlewares/auth.middleware"

const router = express.Router();

router.post("/auth/register", register)
router.post("/auth/login", login)
router.get("/auth/me", authenticate, me)

export default router;