import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    productName: {
      type: String,
      required:true,
      unique:true,
    },
    description: {
      type: String,
    },
    categorieId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'categories',
    },
    productDetails: {
      type: String,
    },
    price: {
      type: Number,
      required:true,
    },
    color: {
      type: String,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
    createdAt: {
      type: Number,
    },
    updatedAt: {
      type: Number,
    },
  },
  {
    timestamps: true,
  }
  );  

const productModel = mongoose.model("Product", productSchema);

export default productModel;
