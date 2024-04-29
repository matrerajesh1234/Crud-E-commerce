import express from "express";
import dotenv from "dotenv";
import connectDatabase from "./config/Database.js";
import indexRouter from './router/index.js'
import errorHandler from "./error/handler.js";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

dotenv.config();
connectDatabase();

//route
app.use("/", indexRouter);


app.use(errorHandler);
// app.use("/uploads", express.static("uploads"));
app.use("/uploads", express.static('uploads'))

app.listen(process.env.PORT, () => {
  console.log(
    `Server Creation Successfully at http://localhost:${process.env.PORT}`
  );
});
