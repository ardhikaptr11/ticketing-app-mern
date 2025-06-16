import { Express } from "express";
import swaggerUi from "swagger-ui-express";
import path from "path";
import fs from "fs";

import outputDocs from "./swagger_output.json";

export const swaggerDocs = (app: Express) => {
	const css = fs.readFileSync(path.resolve(__dirname, "../../node_modules/swagger-ui-dist/swagger-ui.css"), "utf-8");

	app.use("/docs/api", swaggerUi.serve, swaggerUi.setup(outputDocs, { customCss: css }));
};
