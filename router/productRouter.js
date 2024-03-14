import express from "express";
import authentication from "../middleware/auth.js";
import * as productController from "../controller/productController.js";
import productModel from "../models/productModel.js";

const router = express.Router();


router.post('/new',productController.newProduct)

router.get("/show", authentication, productController.listAllProduct);
router.get("/findOneProduct/:id", productController.findOneProduct);
router.put("/update/:id", authentication, productController.updateProduct);
router.delete("/delete/:id", authentication, productController.deleteProduct);

export default router;
