import express from "express";
const router = express.Router();

import userRouter from "./userRouter.js";
import categoryRouter from "./categoriesRouter.js";
import productRouter from "./productRouter.js";

router.use("/user", userRouter);
router.use("/categories",categoryRouter);
router.use("/product", productRouter);

export default router;
