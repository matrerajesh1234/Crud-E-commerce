import express from "express";
import { userController } from "../controller/index.js";
import authentication from "../middleware/auth.js";
const router = express.Router();
import { validationMiddleware } from "../middleware/serverValidation.js";
import { userSchemas } from "../middleware/schemas.js";

router.post(
  "/register",
  validationMiddleware(userSchemas.body.validRegistration),
  userController.registerUser
);

router.post(
  "/login",
  validationMiddleware(userSchemas.body.validLogin),
  userController.loginUser
);

router.get("/list", userController.listAllUser);

router.get(
  "/:id",
  validationMiddleware(null, userSchemas.params.validId),
  authentication,
  userController.findOneUser
);

router.put(
  "/update/:id",
  validationMiddleware(
    userSchemas.body.validUpdate,
    userSchemas.params.validId
  ),
  authentication,
  userController.updateUser
);

router.delete(
  "/delete/:id",
  validationMiddleware(null, userSchemas.params.validId),
  authentication,
  userController.deleteUser
);

router.post(
  "/forgotpassword/:id",
  validationMiddleware(
    userSchemas.body,
    userSchemas.params.validId,
    userSchemas.query
  ),
  authentication,
  userController.forgotPassword
);

router.post(
  "/resetpassword",
  // validationMiddleware(userSchemas.ValidResetPassword),
  userController.resetPassword
);

router.post("/otp", userController.otpSender);

router.post(
  "/verifyotp",
  validationMiddleware(
    userSchemas.body.validVerifyOtp,
    userSchemas.params,
    userSchemas.query
  ),
  userController.otpVerifier
);

export default router;
