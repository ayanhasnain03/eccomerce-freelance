import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import dbConnect from "./lib/db.con.js";
const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(cors());
dotenv.config();

dbConnect();
const envMode = process.env.NODE_ENV || "DEVELOPMENT";
import { errorMiddleware } from "./middlewares/error.js";
import userRouter from "./routes/user.route.js";
import productRouter from "./routes/product.route.js";

app.use("/api/v1/user", userRouter);
app.use("/api/v1/products", productRouter);

app.listen(process.env.PORT, () => {
  console.log(
    `Server is running in ${envMode} mode on port ${process.env.PORT}`
  );
});

app.use(errorMiddleware);
