import swaggerAutogen from "swagger-autogen";

const doc = {
	servers: [
		{
			url: "http://localhost:8765/api",
			description: "Development server"
		},
		{
			url: "https://ticketing-app-backend-eight.vercel.app/api",
			description: "Production server"
		}
	],
	tags: [
		{
			name: "Authentication",
			description: "User authentication endpoints"
		}
	],
	info: {
		contact: {
			name: "Ardhika Putra",
			url: "https://github.com/ardhikaptr11/ticketing-app-mern",
			email: "ardhikaptr11@gmail.com"
		},
		license: {
			name: "ISC"
		},
		version: "v0.0.1",
		title: "A Ticketing App API Docs",
		description:
			"This is the API documentation for a ticketing app built with Node.js, Express, and MongoDB. It provides endpoints for user authentication, ticket management, and more."
	},
	components: {
		securitySchemes: {
			bearerAuth: {
				type: "http",
				scheme: "bearer",
				bearerFormat: "JWT"
			}
		},
		schemas: {
			LoginRequest: {
				identifier: "johndoe123",
				password: "John123!"
			}
		}
	}
};

const outputFile = "./swagger_output.json";
const endpointsFiles = ["../routes/api.ts"];

swaggerAutogen({ openapi: "3.0.0" })(outputFile, endpointsFiles, doc);
