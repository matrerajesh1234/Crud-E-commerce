import express from "express";
import * as categoriesController from "../controller/categoriesController.js";
import authentication from "../middleware/auth.js";
const router = express.Router();

router.post("/create", authentication, categoriesController.newCategories);
router.get("/list", categoriesController.listAllCategorie);
router.put("/update/:id", authentication, categoriesController.updateCategorie);
router.delete(
  "/delete/:id",
  authentication,
  categoriesController.deleteCategorie
);
router.get(
  "/findOneCategorie/:id",
  authentication,
  categoriesController.findOneCategorie
);

export default router;
