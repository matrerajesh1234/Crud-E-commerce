import express from "express";
import * as userController from "../controller/userController.js";
import authentication from "../middleware/auth.js";

const router = express.Router();

router.post("/register", userController.registerUser);
router.post("/login", userController.loginUser);
router.get("/list", userController.listAllUser);
router.get("/user/:id", authentication, userController.findOneUser);
router.put("/user/update/:id", authentication, userController.updateUser);
router.delete("/user/delete/:id", authentication, userController.deleteUser);

export default router;
