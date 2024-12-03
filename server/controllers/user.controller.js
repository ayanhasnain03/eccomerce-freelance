import { asyncHandler } from "../middlewares/error.js";
import { User } from "../models/user.modal.js";
import { sendTokenToClient, uploadFile } from "../utils/features.js";
import { SendError } from "../utils/sendError.js";

export const userRegister = asyncHandler(async (req, res, next) => {
  const file = req.file || [];
  if (!file) return next(new SendError("Avatar is required", 400));
  const { name, email, password, gender } = req.body;
  const existUser = await User.findOne({ email });
  if (existUser) return next(new SendError("User already exist", 400));
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
  sendTokenToClient(res, user, 201, "User Registered Successfully");
});

export const loginUser = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password)
    return next(new SendError("All fields are required", 400));
  const user = await User.findOne({ email }).select("+password");
  if (!user) return next(new SendError("Invalid Email or Password", 400));
  const isPasswordMatched = await user.comparePassword(password);
  if (!isPasswordMatched)
    return next(new SendError("Invalid Email or Password", 400));
  sendTokenToClient(res, user, 200, "User Logged In Successfully");
});

export const getProfile = asyncHandler(async (req, res, next) => {
  const getUser = await User.findById(req.user).select("-password");
  res.json({
    success: true,
    user: {
      name: getUser.name,
      email: getUser.email,
      avatar: getUser.avatar[0].url,
      role: getUser.role,
      gender: getUser.gender,
      createdAt: getUser.createdAt,
      updatedAt: getUser.updatedAt,
    },
  });
});
