import { asyncHandler } from "../middlewares/error.js";
import { SendError } from "../utils/sendError.js";

export const userRegister = asyncHandler(async (req, res, next) => {
  const { name, email, password, gender } = req.body;
  console.log(name, email, password, gender);
  res.status(200).json({
    success: true,
    message: "User Register",
  });
});
