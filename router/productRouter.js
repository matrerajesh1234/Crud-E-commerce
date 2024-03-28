import express from "express";
import authentication from "../middleware/auth.js";
import * as productController from "../controller/productController.js";
const router = express.Router();

router.post("/create", productController.newProduct);
router.get("/list", authentication, productController.listAllProduct);
router.get("/findOneProduct/:id", productController.findOneProduct);
router.put("/update/:id", authentication, productController.updateProduct);
router.delete("/delete/:id", authentication, productController.deleteProduct);

export default router;
