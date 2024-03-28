import categoriesModel from "../models/categories.js";

export const createCategorie = async (categoriesData) => {
  return await categoriesModel.create(categoriesData);
};

export const listAllCategorie = async () => {
  const categoryListFilter = {
    isActive: true,
    isDeleted: false,
  };
  return await categoriesModel.find(categoryListFilter);
};

export const findCategorieOne = async (filter, option) => {
  const categoryFilter = {
    ...filter,
    isActive: true,
    isDeleted: false,
  };
  return await categoriesModel.findOne(categoryFilter, option);
};

export const updateCategorie = async (categoriesId, categoriesData) => {
  return await categoriesModel.findOneAndUpdate(categoriesId, categoriesData);
};

export const deleteCategorie = async (categoriesData) => {
  return await categoriesModel.findOneAndDelete(categoriesData);
};
