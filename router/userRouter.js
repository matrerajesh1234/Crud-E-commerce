import express from "express";
import {userController} from "../controller/index.js";
import authentication from "../middleware/auth.js";

const router = express.Router();

router.post("/register", userController.registerUser);
router.post("/login", userController.loginUser);
router.get("/list", userController.listAllUser);
router.get("/:id", authentication, userController.findOneUser);
router.put("/update/:id", authentication, userController.updateUser);
router.delete("/delete/:id", authentication, userController.deleteUser);


router.post('/forgotpassword/:id',authentication,userController.forgotPassword);
router.post('/resetpassword',userController.resetPassword)

router.get('/otp',userController.otpSender)
router.post('/verifyotp',userController.otpVerifier)

export default router;
