import { asyncHandler } from "../middlewares/error.js";
import { User } from "../models/user.modal.js";
import { uploadFile } from "../utils/features.js";
import { SendError } from "../utils/sendError.js";

export const userRegister = asyncHandler(async (req, res, next) => {
  const file = req.file || [];
  if (!file) return next(new SendError("Avatar is required", 400));
  const { name, email, password, gender } = req.body;

  const result = await uploadFile([file]);
  const avatar = {
    public_id: result[0].public_id,
    url: result[0].url,
  };
  const user = await User.create({
    name,
    email,
    password,
    gender,
    avatar,
  });
  res.status(201).json({
    success: true,
    message: `User ${user.name} registered successfully`,
  });
});
