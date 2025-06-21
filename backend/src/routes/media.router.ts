import express from "express";

import mediaMiddleware from "../middlewares/media.middleware";
import aclMiddleware from "../middlewares/acl.middleware";

import { authenticate } from "../middlewares/auth.middleware";
import { deleteFile, uploadMultipleFile, uploadSingleFile } from "../controllers/media.controller";
import { ROLES } from "../utils/constant";
import { checkUploadError } from "../middlewares/error.middleware";
// import { checkUploadError } from "../middlewares/error.middleware";

const router = express.Router();

router.post(
	"/media/upload-single",
	[authenticate, aclMiddleware([ROLES.ADMIN, ROLES.MEMBER]), mediaMiddleware.single("image"), checkUploadError],
	uploadSingleFile
);
router.post(
	"/media/upload-batch",
	[authenticate, aclMiddleware([ROLES.ADMIN, ROLES.MEMBER]), mediaMiddleware.multiple("images"), checkUploadError],
	uploadMultipleFile
);
router.delete("/media/delete-file", [authenticate, aclMiddleware([ROLES.ADMIN, ROLES.MEMBER])], deleteFile);

export default router;
