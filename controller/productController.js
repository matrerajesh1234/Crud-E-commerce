// import * as productServices from "../services/productServices.js";
import { productServices } from "../services/index.js";
import ImageProductModel from "../models/imageProductModel.js";
import productCategoryRelationModel from "../models/productCategoryRelationModel.js";

import {
  paginatedResponse,
  paginationAndSorting,
  search,
} from "../utils/services.js";
import { BadRequestError } from "../error/error.js"; // Corrected import statement
import { sendResponse } from "../utils/sendResponse.js";

export const newProduct = async (req, res, next) => {
  try {
    const { productName } = req.body;
    console.log(productName)
    const checkProduct = await productServices.findProductOne({ productName });

    if (checkProduct) {
      throw new BadRequestError("Product Already Exists"); // Corrected errorServices to BadRequestError
    }

    const productList = await productServices.createProduct({
      productName: req.body.productName,
      description: req.body.description,
      productDetails: req.body.productDetails,
      price: req.body.price,
      color: req.body.color,
    });

    if (!productList) {
      throw new BadRequestError("Product Adding Process Failed"); // Corrected errorServices to BadRequestError
    }

    const imageObjects = req.files.map((file) => {
      const imagePath = file.path;
      return { productId: productList._id, imageUrl: imagePath };
    });
    await ImageProductModel.insertMany(imageObjects);
    
    const productCategoryData = req.body.categoryId;

    const productCategoryRelationResult = productCategoryData.map((elem) => {
      return { productId: productList._id, categoryId: elem };
    });
    await productCategoryRelationModel.insertMany(
      productCategoryRelationResult
    );

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
      "productCatelogRelation.categoryName",
    ]);
    const { totalRecords } = await productServices.filterPagination(searching);
    const aggregationResult = await productServices.executeAggregation(
      pagination,
      searching
    );

    if (!aggregationResult || aggregationResult.length === 0) {
      throw new BadRequestError("Product Not Found"); // Corrected errorServices to BadRequestError
    }

    let paginatatedData = paginatedResponse(
      aggregationResult,
      pagination.pageCount,
      pagination.limitCount,
      totalRecords
    );

    return sendResponse(
      res,
      200,
      "Fetching all products from the database",
      paginatatedData
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
