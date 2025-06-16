import express from "express";
import authRouter from "./api";

const router = express.Router();

const routes = [authRouter];

routes.forEach((route) => {
	router.use("/api", route);
});

export default router;
