import jwt from "jsonwebtoken";
import { sendResponse } from "../utils/sendResponse.js";
import { getJWTToken } from "../utils/services.js";
import { BadRequestError } from "../error/error.js";
import * as userServices from "../services/userServices.js"; // Changed import statement

export const registerUser = async (req, res, next) => {
  try {
    const { email } = req.body;
    const findUser = await userServices.userFindOne({ email });

    if (findUser) {
      throw new BadRequestError("User Already Exists");
    }

    const createUserData = await userServices.createUser(req.body);

    if (!createUserData) {
      throw new BadRequestError("Registration Failed");
    }

    return sendResponse(res, 200, "Registration Successfully", createUserData);
  } catch (err) {
    next(err);
  }
};

export const loginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      throw new BadRequestError("Please Enter Email or Password"); // Corrected errorServices to BadRequestError
    }
    const checkUser = await userServices.userFindOne({
      email: req.body.email,
    });

    if (!checkUser) {
      throw new BadRequestError("Email Not found ");
    }

    if (checkUser.password !== password) {
      throw new BadRequestError("Invalid Email or Password");
    }

    const token = getJWTToken(checkUser._id, process.env.SECRET, "1h");

    return sendResponse(res, 200, "Login Successfully", token);
  } catch (err) {
    next(err);
  }
};

export const listAllUser = async (req, res, next) => {
  try {
    const userList = await userServices.listAllUser();
    if (!userList) {
      throw new BadRequestError("Invalid Request"); // Corrected errorServices to BadRequestError
    }

    return sendResponse(res, 200, "Fetching all Users from Database", userList);
  } catch (err) {
    next(err);
  }
};

export const findOneUser = async (req, res, next) => {
  try {
    const checkUser = await userServices.userFindOne({ _id: req.params.id });
    console.log(checkUser);

    if (!checkUser) {
      throw new BadRequestError("User not found"); // Corrected errorServices to BadRequestError
    }

    return sendResponse(res, 200, "Successfully Fetched", checkUser);
  } catch (error) {
    next(error);
  }
};

export const updateUser = async (req, res, next) => {
  try {
    const findUser = await userServices.userFindOne({ _id: req.params.id });

    if (!findUser) {
      throw new BadRequestError("User Not Found");
    }

    const emailExits = await userServices.userFindOne({
      email: req.body.email,
      _id: { $ne: req.body.id },
    });

    if (emailExits) {
      throw new BadRequestError("Duplicate Email Error");
    }

    const updatedUserData = await userServices.updateUser(
      { _id: req.params.id }, // Corrected _id: checkUser._id
      {
        username: req.body.username,
        email: req.body.email,
        password: req.body.password,
      }
    );

    if (!updatedUserData) {
      throw new BadRequestError("Please Enter Data to be Update"); // Corrected errorServices to BadRequestError
    }

    return sendResponse(res, 200, "Updated Successfully");
  } catch (err) {
    next(err);
  }
};

export const deleteUser = async (req, res, next) => {
  try {
    const checkUser = await userServices.userFindOne({ _id: req.params.id });

    if (!checkUser) {
      throw new BadRequestError("User Not Found"); // Corrected errorServices to BadRequestError
    }

    const softDeleted = await userServices.updateUser(
      {
        _id: req.params.id,
      },
      { isDeleted: true }
    );

    return sendResponse(res, 200, "Deleted Successfully");
  } catch (err) {
    next(err);
  }
};
