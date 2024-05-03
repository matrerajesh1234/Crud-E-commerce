    import express from "express";
    import authentication from "../middleware/auth.js";
    import { productController } from "../controller/index.js";
    import uploadMiddleware from "../middleware/multer.js";
    // import { validationMiddleware } from "../middleware/serverValidation.js";
    // import { productSchema } from "../middleware/schemas.js";
    const router = express.Router();

    router.post(
    "/create",
    uploadMiddleware.array("imageUrl", 5),
    productController.newProduct
    );
    router.get("/list", authentication, productController.listAllProduct);
    router.get("/findOneProduct/:id", productController.findOneProduct);
    router.put("/update/:id", authentication, productController.updateProduct);
    router.delete("/delete/:id", authentication, productController.deleteProduct);

    export default router;
