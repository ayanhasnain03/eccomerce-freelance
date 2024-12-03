import express from "express";
import { createCategory } from "../controllers/category.controller.js";
import { categoryUpload } from "../middlewares/multer.js";
const router = express.Router();
router.post("/create", categoryUpload, createCategory);
export default router;
