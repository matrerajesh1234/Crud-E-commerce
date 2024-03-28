import express from "express";
import dotenv from "dotenv";
import connectDatabase from "./config/Database.js";
import userRouter from "./router/userRouter.js";
import CategoriesRouter from "./router/categoriesRouter.js";
import productRouter from "./router/productRouter.js";
import errorHandler from "./error/handler.js";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

dotenv.config();
connectDatabase();

app.use("/uploads", express.static("images"));

//route
app.use("/", userRouter);
app.use("/categories", CategoriesRouter);
app.use("/product", productRouter);

//
app.use(errorHandler);

app.listen(process.env.PORT, () => {
  console.log(
    `Server Creation Successfully at http://localhost:${process.env.PORT}`
  );
});
