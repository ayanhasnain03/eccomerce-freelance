// routes/userRoutes.js
import express from "express";
import { loginUser, userRegister } from "../controllers/user.controller.js";
import { avtarUpload } from "../middlewares/multer.js";
import { registerValidation, validateHandler } from "../lib/validator.js";

const router = express.Router();

router.post(
  "/register",
  avtarUpload,
  registerValidation,
  validateHandler,
  userRegister
);
router.post("/login", loginUser);

export default router;
