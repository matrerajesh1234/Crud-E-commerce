import * as userServices from "../services/userServices.js";
import jwt from "jsonwebtoken";

export const registerUser = async (req, res, next) => {
  try {
    const { email } = req.body;
    const checkUser = await userServices.userFindOne({ email });

    if (checkUser) {
      return res.status(401).json({
        Message: "User Already Exists",
      });
    }

    const createUserData = await userServices.createUser(req.body);

    if (!createUserData) {
      return res.status(200).json({
        message: "Registration falied",
      });
    }

    return res.status(200).json({
      Message: "Registration Succesfully",
      createUserData,
    });
  } catch (err) {
    console.log(err);
  }
};

export const loginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      console.log("Please Enter Email or Password");
    }

    const checkUser = await userServices.userFindOne({
      email: email,
      password: password,
    });

    if (!checkUser) {
      return res.status(401).json({
        message: "Invalid Email or Password",
      });
    }

    const token = jwt.sign({ _id: checkUser.id }, process.env.SECRET, {
      expiresIn: "1h",
    });

    return res.status(200).json({
      message: "login Sucessfully",
      token,
    });
  } catch (err) {
    console.log(err);
  }
};

export const listAllUser = async (req, res, next) => {
  try {
    const userData = await userServices.listAllUser();
    if (!userData) {
      return res.status(400).json({
        message: "Invalid Request",
      });
    }

    return res.status(200).json({
      message: "Fetching all Users from Database",
      userData,
    });
  } catch (err) {
    console.log(err);
  }
};

export const FindOneUser = async (req, res, next) => {
  const checkUser = await userServices.userFindOne({ id: req.body.id });

  if (!checkUser) {
    return res.status(400).json({
      message: "User Not Found",
    });
  }

  return res.status(200).json({
    message: "Succesfully Fetched",
    checkUser,
  });
};

export const updateUser = async (req, res, next) => {
  try {
    const checkUser = await userServices.userFindOne({ id: req.body.id });

    if (!checkUser) {
      return res.status(400).json({
        message: "User Not Found",
      });
    }

    const updatedUserData = await userServices.updateUser(
      { _id: checkUser },
      req.body
    );

    if (!updatedUserData) {
      return res.status(401).json({
        Message: "Please Enter Data to be Update",
      });
    }

    return res.status(200).json({
      message: "Updated Succesfully",
    });
  } catch (error) {
    console.log("Error:", error);
  }
};

export const deleteUser = async (req, res, next) => {
  try {
    const checkUser = await userServices.userFindOne({ id: req.body.id });

    if (!checkUser) {
      return res.status(400).json({
        message: "User Not Found",
      });
    }

    const deleteUserData = await userServices.deleteUser({
      id: req.body.checkUser,
    });

    return res.status(200).json({
      message: "Deleted Succesfully",
    });
  } catch (error) {
    console.log("Error:", error);
  }
};
