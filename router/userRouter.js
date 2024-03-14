import express from "express";
import * as userController from "../controller/userController.js";
import authentication from "../middleware/auth.js";

const router = express.Router();

router.post("/", authentication, userController.registerUser);
router.post("/login", userController.loginUser);
router.get("/show", authentication, userController.listAllUser);
router.get("/user/:id", authentication, userController.FindOneUser);
router.put("/user/update/:id", authentication, userController.updateUser);
router.delete("/user/delete/:id", authentication, userController.deleteUser);

export default router;
