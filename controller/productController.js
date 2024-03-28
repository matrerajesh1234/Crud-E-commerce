import * as productServices from "../services/productServices.js";
import { paginationAndSorting, search } from "../utils/services.js";
import { sendResponse } from "../utils/sendResponse.js";
import { BadRequestError } from "../error/error.js"; // Corrected import statement
import productModel from "../models/productModel.js";

export const newProduct = async (req, res, next) => {
  try {
    const { productName } = req.body;
    const checkProduct = await productServices.findProductOne({ productName });

    if (checkProduct) {
      throw new BadRequestError("Product Already Exists"); // Corrected errorServices to BadRequestError
    }

    const productList = await productServices.createProduct(req.body);

    if (!productList) {
      throw new BadRequestError("Product Adding Process Failed"); // Corrected errorServices to BadRequestError
    }

    return sendResponse(res, 200, "Product Added", productList);
  } catch (err) {
    next(err);
  }
};

export const listAllProduct = async (req, res, next) => {
  try {
    const pagination = paginationAndSorting(req.query, "_id");
    const searching = search(req.query.search, [
      "productName",
      "color",
      "description",
      "category.categoryName",
    ]);
    const aggregationResult = await productServices.executeAggregation(
      pagination,
      searching
    );

    if (!aggregationResult || aggregationResult.length === 0) {
      throw new BadRequestError("Product Not Found"); // Corrected errorServices to BadRequestError
    }
    return sendResponse(
      res,
      200,
      "Fetching all products from the database",
      aggregationResult
    );
  } catch (err) {
    next(err);
  }
};

export const findOneProduct = async (req, res, next) => {
  try {
    const checkProduct = await productServices.findProductOne({
      _id: req.params.id,
    });

    if (!checkProduct) {
      throw new BadRequestError("Product Not Found"); // Corrected errorServices to BadRequestError
    }

    return sendResponse(res, 200, "Product list", checkProduct);
  } catch (error) {
    next(error);
  }
};

export const updateProduct = async (req, res, next) => {
  try {
    const checkProduct = await productServices.findProductOne({
      _id: req.params.id,
    });

    if (!checkProduct) {
      throw new BadRequestError("Product not found"); // Corrected errorServices to BadRequestError
    }

    const productExist = await productServices.findProductOne({
      productName: req.body.productName,
      _id: { $ne: req.params.id },
    });

    if (productExist) {
      throw new BadRequestError("Product Already Exists");
    }

    const updatedProductData = await productServices.updateProduct(
      { _id: req.params.id },
      {
        productName: req.body.productName,
        color: req.body.color,
      }
    );

    if (!updatedProductData) {
      throw new BadRequestError("Please Enter the Data to be Update"); // Corrected errorServices to BadRequestError
    }

    return sendResponse(res, 200, "Updated");
  } catch (error) {
    next(error);
  }
};

export const deleteProduct = async (req, res, next) => {
  try {
    const checkProduct = await productServices.findProductOne({
      _id: req.params.id,
    });
    if (!checkProduct) {
      throw new BadRequestError("Product not found"); // Corrected errorServices to BadRequestError
    }

    const softDeleted = await productServices.updateProduct(
      {
        _id: req.params.id,
      },
      { isDeleted: true }
    );

    return sendResponse(res, 200, "Delete Successful");
  } catch (error) {
    next(error);
  }
};
