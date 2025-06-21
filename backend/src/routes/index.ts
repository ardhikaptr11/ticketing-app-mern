import express from "express";
import authRouter from "./auth.router";
import mediaRouter from "./media.router";
import categoryRouter from "./category.router";

const router = express.Router();

const routes = [authRouter, mediaRouter, categoryRouter];

routes.forEach((route) => {
	router.use("/api", route);
});

export default router;
