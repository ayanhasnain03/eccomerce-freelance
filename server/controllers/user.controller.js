import { asyncHandler } from "../middlewares/error.js";

export const userRegister = asyncHandler(async (req, res, next) => {
  const { name, email, password } = req.body;
  console.log(name, email, password);
  res.status(200).json({
    success: true,
    message: "User Register",
  });
});
