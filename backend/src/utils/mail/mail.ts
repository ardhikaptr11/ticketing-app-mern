import nodemailer from "nodemailer";
import path from "path";
import ejs from "ejs";

import {
	EMAIL_SMTP_SECURE,
	EMAIL_SMTP_USER,
	EMAIL_SMTP_PASS,
	EMAIL_SMTP_PORT,
	EMAIL_SMTP_HOST,
	EMAIL_SMTP_SERVICE
} from "../env";
import { ISendMail, MockTransporter, SendEmailOptions } from "../interface";

let transporter;

try {
	const config = {
		service: EMAIL_SMTP_SERVICE,
		host: EMAIL_SMTP_HOST,
		port: EMAIL_SMTP_PORT,
		secure: EMAIL_SMTP_SECURE,
		auth: {
			user: EMAIL_SMTP_USER,
			pass: EMAIL_SMTP_PASS
		},
		requireTLS: true
	};

	transporter = nodemailer.createTransport(config);
} catch (error) {
	console.error("Email transporter failed to create:", error);

	transporter = {
		sendMail: (options: SendEmailOptions): Promise<{ id: string; response: string }> => {
			console.log("This email should be sent to:", {
				from: options.from,
				to: options.to,
				subject: options.Subject
			});
			return Promise.resolve({ id: "mockId", response: "mockResponse" });
		},
		verify: (): Promise<boolean> => Promise.resolve(true)
	} as MockTransporter;
}

export const verifyEmailConfig = async () => {
	try {
		if (!EMAIL_SMTP_HOST) throw new Error("Host is not defined");
		if (!EMAIL_SMTP_PORT) throw new Error("Port is not defined");
		if (!EMAIL_SMTP_USER) throw new Error("User is not defined");
		if (!EMAIL_SMTP_PASS) throw new Error("Password is not defined");

		await transporter.verify();
		console.log("✅ Server is ready to send messages");
	} catch (error: any) {
		console.error("❌ Error with email configurations:", error.message);

		if (error.code === "EAUTH") throw new Error("Invalid email credentials");
		if (error.code === "ECONNECTION") throw new Error("Connection error");
		if (error.code === "EENVELOPE") throw new Error("Invalid email envelope");
		if (error.code === "ETIMEDOUT") throw new Error("Connection timed out");

		console.warn("⚠️ Email functionality may not work as expected");
	}
};

export const sendMail = async ({ ...emailParams }: ISendMail) => {
	const result = await transporter.sendMail({ ...emailParams });

	return result;
};

export const renderMailHtml = async (template: string, data: any): Promise<string> => {
	const content = await ejs.renderFile(path.join(__dirname, `templates/${template}`), data);

	return content as string;
};
