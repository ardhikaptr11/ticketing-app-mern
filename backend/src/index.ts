import express from "express";
import bodyParser from "body-parser";
import cors from "cors";

import routes from "./routes/index";
import db from "./utils/database";

const init = async () => {
	try {
		const result = await db();

		console.log(result);

		const app = express();

		app.use(bodyParser.json());
		app.use(routes);
		app.use(
			cors({
				origin: (origin, callback) => {
					const pattern = /^https:\/\/ticketing-app-backend-[\w]+-ardhika-putras-projects\.vercel\.app$/;

					if (!origin || pattern.test(origin)) {
						callback(null, true);
					} else {
						callback(new Error("Not allowed by CORS"));
					}
				},
				credentials: true
			})
		);

		const PORT = process.env.PORT || 8765;
		const time = new Intl.DateTimeFormat("en-US", {
			dateStyle: "long",
			timeStyle: "long",
			hourCycle: "h24",
			timeZone: "Asia/Jakarta"
		}).format(new Date());

		app.get("/", (_req, res, _next) => {
			res.send({
				status: `Server is up and running`,
				time
			});
		});

		app.listen(PORT, () => {
			console.log(`Server is running on port ${PORT}`);
		});
	} catch (error) {
		console.log(error);
	}
};

init();
