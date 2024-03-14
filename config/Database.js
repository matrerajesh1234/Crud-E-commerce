import mongoose from "mongoose";

const connectDatabase = async (req, res, next) => {
  return await mongoose
    .connect(process.env.DB_URI)
    .then(() => {
      console.log("Database Creation Successfully");
    })
    .catch((err) => {
      console.log(`Database Error: ${err}`);
    });
};

export default connectDatabase;
