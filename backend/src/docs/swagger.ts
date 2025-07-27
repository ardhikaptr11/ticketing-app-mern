import { name } from "ejs";
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
		},
		{
			name: "Category",
			description: "Category management endpoints"
		},
		{
			name: "Events",
			description: "Event management endpoints"
		},
		{
			name: "Tickets",
			description: "Ticket management endpoints"
		},
		{
			name: "Banners",
			description: "Banner management endpoints"
		},
		{
			name: "Orders",
			description: "Order management endpoints"
		},
		{
			name: "Media",
			description: "Media management endpoints"
		},
		{
			name: "Regions",
			description: "Region management endpoints"
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
			RegisterRequest: {
				fullName: "John Doe",
				email: "john.doe@example.com",
				username: "johndoe123",
				password: "John123!",
				confirmPassword: "John123!"
			},
			LoginRequest: {
				identifier: "johndoe123",
				password: "John123!"
			},
			UpdateProfileRequest: {
				fullName: "John Peter Doe",
				profilePicture: "https://example.com/path/to/profile-picture.jpg"
			},
			UpdatePasswordRequest: {
				currentPassword: "John123!",
				newPassword: "John1234!"
			},
			ActivationRequest: {
				code: "code sent to email"
			},
			CreateCategoryRequest: {
				name: "Category name",
				description: "Category description",
				icons: "Icon URL or base64 string"
			},
			CreateEventRequest: {
				name: "A name for the event",
				banner: "A banner for the event",
				category: "A category for the event (ObjectID)",
				description: "A description for the event",
				startDate: "yyyy-mm-dd hh:mm:ss",
				endDate: "yyyy-mm-dd hh:mm:ss",
				location: {
					region: "Region ID",
					coordinates: [0, 0],
					address: "Event address"
				},
				isOnline: false,
				isFeatured: false,
				isPublished: false
			},
			CreateTicketRequest: {
				name: "A name for the ticket",
				description: "A description for the ticket",
				events: "An event the ticket belongs to (ObjectID)",
				price: 0,
				quantity: 100
			},
			CreateBannerRequest: {
				title: "Title of the banner",
				image: "Image URL",
				isShow: true
			},
			CreateOrderRequest: {
				ticket: "A ticket the order is for (ObjectID)",
				quantity: 2,
				events: "An event the order is for (ObjectID)"
			},
			DeleteMediaRequest: {
				fileURL: "https://example.com/path/to/cloudinary/file.jpg"
			}
		}
	}
};

const outputFile = "./swagger_output.json";
const endpointsFiles = [
	"../routes/auth.router.ts",
	"../routes/category.router.ts",
	"../routes/event.router.ts",
	"../routes/ticket.router.ts",
	"../routes/banner.router.ts",
	"../routes/order.router.ts",
	"../routes/media.router.ts",
	"../routes/region.router.ts"
];

swaggerAutogen({ openapi: "3.0.0" })(outputFile, endpointsFiles, doc);
