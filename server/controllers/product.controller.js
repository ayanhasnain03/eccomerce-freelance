import { asyncHandler } from "../middlewares/error.js";
import { SendError } from "../utils/sendError.js";

export const getProducts = asyncHandler(async (req, res, next) => {
  if (!req.user) return next(new SendError("Unauthorized", 401));
  res.status(200).json({
    success: true,
    message: "All Products",
  });
});
