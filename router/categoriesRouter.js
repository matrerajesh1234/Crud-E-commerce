import express from "express";
import { categoriesController } from "../controller/index.js";
import authentication from "../middleware/auth.js";
// import { validationMiddleware } from "../middleware/serverValidation.js";
// import { categorySchemas } from "../middleware/schemas.js";
const router = express.Router();

router.post(
  "/create",
  // validationMiddleware(categorySchemas.ValidCreateCategory),
  authentication,
  categoriesController.newCategories
);
router.get("/list", categoriesController.listAllCategorie);
router.put(
  "/update/:id",
  // validationMiddleware(categorySchemas.ValidUpdateCategory),
  authentication,
  categoriesController.updateCategorie
);
router.delete(
  "/delete/:id",
  // validationMiddleware(categorySchemas.ValidCategoryId),
  authentication,
  categoriesController.deleteCategorie
);
router.get(
  "/findOneCategorie/:id",
  // validationMiddleware(categorySchemas.ValidCategoryId),
  authentication,
  categoriesController.findOneCategorie
);

export default router;
