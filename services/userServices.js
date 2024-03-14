import userModel from "../models/user.js";

export const createUser = async (userData) => {
  return await userModel.create(userData);
};

export const listAllUser = async () => {
  return await userModel.find();
};

export const userFindOne = async (filter, option) => {
  return await userModel.findOne(filter, option);
};

export const updateUser = async (userId, userData) => {
  return await userModel.findOneAndUpdate(userId, userData);
};

export const deleteUser = async (userData) => {
  return await userModel.findOneAndDelete(userData);
};
