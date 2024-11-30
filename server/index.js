import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(cors());
dotenv.config();
const envMode = process.env.NODE_ENV || "DEVELOPMENT";

import productRouter from "./routes/product.route.js";
import { errorMiddleware } from "./middlewares/error.js";

app.use("/api/v1/products", productRouter);

app.listen(process.env.PORT, () => {
  console.log(
    `Server is running in ${envMode} mode on port ${process.env.PORT}`
  );
});

app.use(errorMiddleware);
