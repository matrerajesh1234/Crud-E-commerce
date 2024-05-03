import express from "express";
import { userController } from "../controller/index.js";
import authentication from "../middleware/auth.js";
const router = express.Router();
import { validationMiddleware } from "../middleware/serverValidation.js";
import { userSchemas } from "../middleware/schemas.js";

router.post(
  "/register",
  validationMiddleware(userSchemas.body.validRegistration, "body"),
  userController.registerUser
);
router.post(
  "/login",
  validationMiddleware(userSchemas.body.validLogin, "body"),
  userController.loginUser
);
router.get("/list", userController.listAllUser);
router.get(
  "/:id",
  validationMiddleware(userSchemas.params.validId, "params"),
  authentication,
  userController.findOneUser
);
router.put(
  "/update/:id",
  validationMiddleware(userSchemas.body.validUpdate, "body"),
  validationMiddleware(userSchemas.params.validId, "params"),
  authentication,
  userController.updateUser
);
router.delete(
  "/delete/:id",
  validationMiddleware(userSchemas.params.validId, "params"),
  authentication,
  userController.deleteUser
);
router.post(
  "/forgotpassword/:id",
  validationMiddleware(userSchemas.params.validId, "params"),
  authentication,
  userController.forgotPassword
);
router.post(
  "/resetpassword",
  validationMiddleware(userSchemas.body.validResetPassword,"body"),
  userController.resetPassword
);
router.post("/otp", userController.otpSender);
router.post(
  "/verifyotp",
  validationMiddleware(userSchemas.body.validVerifyOtp, "body"),
  userController.otpVerifier
);

export default router;