import express from "express";
import authRouter from "./auth.router";
import mediaRouter from "./media.router";
import categoryRouter from "./category.router";
import regionRouter from "./region.router";
import eventRouter from "./event.router";
import ticketRouter from "./ticket.router";

const router = express.Router();

const routes = [authRouter, mediaRouter, categoryRouter, regionRouter, eventRouter, ticketRouter];

routes.forEach((route) => {
	router.use("/api", route);
});

export default router;
