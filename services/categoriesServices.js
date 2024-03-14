import categoriesModel from "../models/categories.js";

export const createCategorie = async (categoriesData) => {
  return await categoriesModel.create(categoriesData);
};

export const listAllCategorie = async () => {
  return await categoriesModel.find();
};

export const findCategorieOne = async (filter, option) => {
  return await categoriesModel.findOne(filter, option);
};

export const updateCategorie = async (categoriesId, categoriesData) => {
  return await categoriesModel.findOneAndUpdate(categoriesId, categoriesData);
};

export const deleteCategorie = async (categoriesData) => {
  return await categoriesModel.findOneAndDelete(categoriesData);
};
