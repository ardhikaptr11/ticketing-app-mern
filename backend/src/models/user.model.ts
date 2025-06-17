import mongoose from "mongoose";
import { encrypt } from "../utils/encryption";
import { sendMail, renderMailHtml, verifyEmailConfig } from "../utils/mail/mail";
import { CLIENT_HOST, EMAIL_SMTP_USER } from "../utils/env";

export interface User {
	fullName: string;
	username: string;
	email: string;
	password: string;
	role: string;
	profilePicture: string;
	isActive: boolean;
	activationCode: string;
	createdAt?: string;
}

const Schema = mongoose.Schema;

const UserSchema = new Schema<User>(
	{
		fullName: {
			type: Schema.Types.String,
			required: true
		},
		username: {
			type: Schema.Types.String,
			required: true,
			unique: true
		},
		email: {
			type: Schema.Types.String,
			required: true,
			unique: true
		},
		password: {
			type: Schema.Types.String,
			required: true
		},
		role: {
			type: Schema.Types.String,
			enum: ["admin", "user"],
			default: "user"
		},
		profilePicture: {
			type: Schema.Types.String,
			default: "user.jpg"
		},
		isActive: {
			type: Schema.Types.Boolean,
			default: false
		},
		activationCode: {
			type: Schema.Types.String
		}
	},
	{
		timestamps: true
	}
);

UserSchema.pre("save", function (next) {
	const user = this;

	user.password = encrypt(user.password);
	user.activationCode = encrypt(user.id);

	next();
});

UserSchema.post("save", async function (doc, next) {
	const user = doc;

	try {
		console.log("Send email to:", user.email);

		const formattedDate = new Intl.DateTimeFormat("en-US", {
			dateStyle: "medium",
			timeStyle: "long",
			hourCycle: "h24",
			timeZone: "Asia/Jakarta"
		}).format(new Date());

		const contentMail = await renderMailHtml("registration-success.ejs", {
			username: user.username,
			fullName: user.fullName,
			email: user.email,
			createdAt: formattedDate,
			activationLink: `${CLIENT_HOST}/auth/activation?code=${user.activationCode}`
		});

		console.log("Checking email configuration...");
		await verifyEmailConfig();

		await sendMail({
			from: EMAIL_SMTP_USER,
			to: user.email,
			subject: "[Action Needed] - User Activation",
			html: contentMail
		});
	} catch (error) {
		console.error(error);
	} finally {
		next();
	}
});

UserSchema.methods.toJSON = function () {
	const user = this.toObject();

	delete user.password;
	return user;
};

export const UserModel = mongoose.model("User", UserSchema);
