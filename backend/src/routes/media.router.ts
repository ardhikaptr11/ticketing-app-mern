import express from "express";

import mediaMiddleware from "../middlewares/media.middleware";
import aclMiddleware from "../middlewares/acl.middleware";

import { authenticate } from "../middlewares/auth.middleware";
import { deleteFile, uploadMultipleFile, uploadSingleFile } from "../controllers/media.controller";
import { ROLES } from "../utils/constant";
import { checkUploadError } from "../middlewares/error.middleware";

const router = express.Router();

router.post(
	"/media/upload-single",
	[authenticate, aclMiddleware([ROLES.ADMIN, ROLES.MEMBER]), mediaMiddleware.single("image"), checkUploadError],
	uploadSingleFile
	/**
	  #swagger.tags = ["Media"]
	  #swagger.security = [{
	    "bearerAuth": []
	  }]
	  #swagger.requestBody = {
	    required: true,
		content: {
		  "multipart/form-data": {
		    schema: {
			  type: "object",
			  properties: {
			    image: {
				  type: "string",
				  format: "binary"
				}
			  }
			}
		  }
		}
	  }
	 */
);
router.post(
	"/media/upload-batch",
	[authenticate, aclMiddleware([ROLES.ADMIN, ROLES.MEMBER]), mediaMiddleware.multiple("images"), checkUploadError],
	uploadMultipleFile
	/**
	  #swagger.tags = ["Media"]
	  #swagger.security = [{
	    "bearerAuth": []
	  }]
	  #swagger.requestBody = {
	    required: true,
		content: {
		  "multipart/form-data": {
		    schema: {
			  type: "object",
			  properties: {
			    images: {
				  type: "array",
				  items: {
				    type: "string",
					format: "binary"
				  }
				}
			  }
			}
		  }
		}
	  }
	 */
);
router.delete(
	"/media/delete-file",
	[authenticate, aclMiddleware([ROLES.ADMIN, ROLES.MEMBER])],
	deleteFile
	/**
	  #swagger.tags = ["Media"]
	  #swagger.security: [{
	    "bearerAuth": []
	  }]
	  #swagger.requestBody: {
	    required: true,
		schema: {
		  $ref: "#/components/schemas/DeleteMediaRequest"
		}
	  }
	 */
);

export default router;
