import categoriesModel from "../models/categories.js";
import { categoriesServices } from "../services/index.js";
import { sendResponse } from "../utils/sendResponse.js";
import { BadRequestError } from "../error/error.js"; // Corrected import statement

export const newCategories = async (req, res, next) => {
  try {
    const { categoryName } = req.body;
    const checkCategoryName = await categoriesServices.findCategorieOne({
      categoryName,
    });

    if (checkCategoryName) {
      throw new BadRequestError("Category Already Exists"); // Corrected errorServices to BadRequestError
    }

    const categorieData = await categoriesModel.create(req.body);

    if (!categorieData) {
      throw new BadRequestError("Categories adding process failed"); // Corrected errorServices to BadRequestError
    }

    return sendResponse(
      res,
      200,
      "Categories Created Succesfully",
      categorieData
    );
  } catch (err) {
    next(err);
  }
};

export const listAllCategorie = async (req, res, next) => {
  try {
    const categoryData = await categoriesServices.listAllCategorie();
    if (!categoryData) {
      throw new BadRequestError("Category Not Found"); // Corrected errorServices to BadRequestError
    }
    return sendResponse(
      res,
      200,
      "Fetching all categoires from Database",
      categoryData
    );
  } catch (err) {
    next(err);
  }
};

export const findOneCategorie = async (req, res, next) => {
  try {
    const checkCategorie = await categoriesServices.findCategorieOne({
      _id: req.params.id, // Corrected req.body.id to req.params.id
    });

    if (!checkCategorie) {
      throw new BadRequestError("Category Not Found"); // Corrected errorServices to BadRequestError
    }

    return sendResponse(res, 200, "Succesfully Fetched", checkCategorie);
  } catch (error) {
    next(error);
  }
};

export const updateCategorie = async (req, res, next) => {
  try {
    const checkCategorie = await categoriesServices.findCategorieOne({
      _id: req.params.id, // Corrected req.body.id to req.params.id
    });

    if (!checkCategorie) {
      throw new BadRequestError("Categories Not Found"); // Corrected errorServices to BadRequestError
    }

    const categoryExist = await categoriesServices.findCategorieOne({
      categoryName: req.body.categoryName,
      _id: { $ne: req.body.id },
    });

    if (categoryExist) {
      throw new BadRequestError("Category Already Exists");
    }

    const updatedCategoriesData = await categoriesServices.updateCategorie(
      { _id: req.params.id }, // Corrected _id: checkCategorie to _id: req.params.id
      req.body
    );

    if (!updatedCategoriesData) {
      throw new BadRequestError("Please Enter Data to be Update"); // Corrected errorServices to BadRequestError
    }

    return sendResponse(res, 200, "Update Categorie Succesfully", null);
  } catch (error) {
    next(error);
  }
};

export const deleteCategorie = async (req, res, next) => {
  try {
    const checkCategorie = await categoriesServices.findCategorieOne({
      _id: req.params.id,
    });

    if (!checkCategorie) {
      throw new BadRequestError("Categorie Not Found"); // Corrected errorServices to BadRequestError
    }

    const softDeleted = await categoriesServices.updateCategorie(
      {
        _id: req.params.id,
      },
      { isDeleted: true }
    );


    return sendResponse(res, 200, "Deleted Succesfully");
  } catch (error) {
    next(error);
  }
};
