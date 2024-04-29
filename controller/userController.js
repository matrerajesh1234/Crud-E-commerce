import { sendResponse } from "../utils/sendResponse.js";
import { getJWTToken, sendToken } from "../utils/services.js";
import { BadRequestError } from "../error/error.js";
import { userServices } from "../services/index.js";
import { MailService } from "../utils/mail.js";
import path from "path";
import Twilio from "twilio/lib/rest/Twilio.js";

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

export const forgotPassword = async (req, res, next) => {
  const checkUser = await userServices.userFindOne({ _id: req.params.id });

  if (!checkUser) {
    throw new Error("User not found");
  }
  const { id } = checkUser;
  let token = getJWTToken(id, process.env.SECRET, "5m");
  const resetLink = path.join(process.env.BASEURL, token);
  MailService(checkUser.email, "Jaldi kholo", resetLink);
  sendResponse(res, 200, `Email Send to ${checkUser.email}`);
};

export const resetPassword = async (req, res, next) => {
  const { token, newPassword } = req.body;

  const decord = sendToken(token, process.env.SECRET);
  const User = await userServices.userFindOne({ _id: decord._id });

  if (!User) {
    throw new BadRequestError("User not found");
  }
  const userEmail = User.email;

  const updatePassword = await userServices.updateUser(
    {
      email: userEmail,
    },
    {
      password: req.body.newPassword,
    }
  );

  if (!updatePassword) {
    throw new BadRequestError("Something went wrong in password");
  }

  sendResponse(res, 200, "Password Change Successfully");
};

export const otpSender = async (req, res, next) => {
  try {
    const accountSid = process.env.TWILIO_ACCOUNT_SID;
    const authToken = process.env.TWILIO_AUTH_TOKEN;
    const client = new Twilio(accountSid, authToken);
    const serviceSid = process.env.TWILIO_SERVICE_SID;

    const otp = client.verify.v2
      .services(serviceSid)
      .verifications.create({ to: "+919313782326", channel: "sms" })
      .then((verification) => console.log(verification.sid));

    sendResponse(res, 200, "Otp Send Succesfully");
  } catch (error) {
    console.error("Error sending verification message:", error);
    sendResponse(res, 400, "Verification failed");
  }
};

export const otpVerifier = async (req, res, next) => {
  try {
    const accountSid = process.env.TWILIO_ACCOUNT_SID;
    const authToken = process.env.TWILIO_AUTH_TOKEN;
    const serviceSid = process.env.TWILIO_SERVICE_SID;
    const client = new Twilio(accountSid, authToken);
    const otp = req.body.otp;
    const toNumber = req.body.number;

    const userFind = await userServices.userFindOne({
      phoneNumber: "+919313782326",
    });
    const userId = userFind._id;

    const verification = await client.verify.v2
      .services(serviceSid)
      .verificationChecks.create({ to: toNumber, code: otp });

    console.log(verification.status);

    if (verification.status !== "approved") {
      throw new BadRequestError("Invalid OTP");
    }

    const token = getJWTToken(userId, process.env.SECRET, "5m");

    sendResponse(res, 200, "Otp Verified", token);
  } catch (error) {
    next(error);
  }
};
