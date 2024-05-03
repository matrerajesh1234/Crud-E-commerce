import express from "express";
import authentication from "../middleware/auth.js";
import { productController } from "../controller/index.js";
import uploadMiddleware from "../middleware/multer.js";
import { validationMiddleware } from "../middleware/serverValidation.js";
import { productSchemas } from "../middleware/schemas.js";

const router = express.Router();

router.post(
  "/create",
  uploadMiddleware.array("imageUrl", 5),
  validationMiddleware(productSchemas.body.ValidCreateProduct, "body"),
  validationMiddleware(productSchemas.files, "files"),
  productController.newProduct
);

router.get(
  "/list",
  validationMiddleware(productSchemas.query.ValidListRequest, "query"),
  authentication,
  productController.listAllProduct
);
router.get(
  "/findOneProduct/:id",
  validationMiddleware(productSchemas.params.valid, "params"),
  productController.findOneProduct
);
router.put(
  "/update/:id",
  validationMiddleware(productSchemas.body.ValidUpdateProduct, "body"),
  validationMiddleware(productSchemas.params.ValidProductId, "params"),
  authentication,
  productController.updateProduct
);
router.delete(
  "/delete/:id",
  validationMiddleware(productSchemas.params.ValidProductId),
  authentication,
  productController.deleteProduct
);

export default router;
