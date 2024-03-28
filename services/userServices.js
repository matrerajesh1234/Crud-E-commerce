import userModel from "../models/user.js";

export const createUser = async (userData) => {
  return await userModel.create(userData);
};

export const listAllUser = async () => {
  const userListFilter = {
    isDeleted: false,
    isActive: true,
  };
  return await userModel.find(userListFilter);
};

export const userFindOne = async (filter, option) => {
  const userFilter = {
    ...filter,
    isActive: true,
    isDeleted: false,
  };
  return await userModel.findOne(userFilter, option);
};

export const updateUser = async (userId, userData) => {
  return await userModel.findOneAndUpdate(userId, userData);
};

export const deleteUser = async (userData) => {
  return await userModel.findOneAndDelete(userData);
};
