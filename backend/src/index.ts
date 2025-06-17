import express from "express";
import bodyParser from "body-parser";
import cors from "cors";

import routes from "./routes/index";
import db from "./utils/database";
import { swaggerDocs } from "./docs/route";

const init = async () => {
	try {
		const result = await db();

		console.log(result);

		const app = express();

		app.use(
			cors({
				origin: (origin, callback) => {
					const pattern = /^https:\/\/ticketing-app-backend-[\w]+-ardhika-putras-projects\.vercel\.app$/;

					if (!origin || pattern.test(origin) || origin === "http://localhost:8765") {
						callback(null, true);
					} else {
						callback(new Error("Not allowed by CORS"));
					}
				},
				credentials: true
			})
		);
		app.use(bodyParser.json());
		app.use(routes);
		swaggerDocs(app);

		const PORT = process.env.PORT || 8765;

		const NODE_ENV = process.env.NODE_ENV || "development";
		const BASE_URL =
			NODE_ENV === "development" ? `http://localhost:${PORT}` : `https://ticketing-app-backend-eight.vercel.app`;

		const time = new Intl.DateTimeFormat("en-US", {
			dateStyle: "long",
			timeStyle: "long",
			hourCycle: "h24",
			timeZone: "Asia/Jakarta"
		}).format(new Date());

		app.get("/", (_req, res, _next) => {
			res.send(`
				<html>
					<body style="font-family: monospace; background-color: #121212; color: #ffffff">
						<p>
							{ <br/>
								<span style="margin-left: 2rem;">
									message: "Server is up and running. Docs available at <a style="color: #ffffff;" href="${BASE_URL}/docs/api" target="_blank">${BASE_URL}/docs/api</a>,
								</span><br/>
								<span style="margin-left: 2rem;">serverTime: "${time}"</span><br/>
							}
						</p>
					</body>
				</html>
			`);
		});

		app.listen(PORT, () => {
			console.log(`Server is running on http://localhost:${PORT}`);
		});
	} catch (error) {
		console.log(error);
	}
};

init();
