// routes/userRoutes.js
import express from "express";
import {
  getProfile,
  loginUser,
  userRegister,
} from "../controllers/user.controller.js";
import { avtarUpload } from "../middlewares/multer.js";
import { registerValidation, validateHandler } from "../lib/validator.js";
import { isAdmin, isAuthenticated } from "../middlewares/authentication.js";

const router = express.Router();

router.post(
  "/register",
  avtarUpload,
  registerValidation,
  validateHandler,
  userRegister
);
router.post("/login", loginUser);
router.use(isAuthenticated);
router.get("/profile", getProfile);

export default router;
