import express from "express";
import { userRegister } from "../controllers/user.controller.js";
import { avtarUpload } from "../middlewares/multer.js";

const router = express.Router();

router.post("/register", avtarUpload, userRegister);

export default router;
