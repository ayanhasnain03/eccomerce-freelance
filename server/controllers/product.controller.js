import { asyncHandler } from "../middlewares/error.js";
import Product from "../models/product.model.js";
import { uploadFile } from "../utils/features.js";
import { SendError } from "../utils/sendError.js";

// Get All Products
export const getProducts = asyncHandler(async (req, res, next) => {
  // Ensure the user is authenticated
  if (!req.user) return next(new SendError("Unauthorized", 401));

  // Fetch all products
  const products = await Product.find().populate("category").exec();

  res.status(200).json({
    success: true,
    message: "All Products Retrieved Successfully",
    products,
  });
});

export const createProduct = asyncHandler(async (req, res, next) => {
  const files = req.files || [];
  const { name, description, price, brand, stock, quantity } = req.body;
  console.log(
    "Request Body:",
    name,
    description,
    price,
    brand,
    stock,
    quantity
  );
  if (
    !name ||
    !description ||
    !price ||
    !brand ||
    !stock ||
    !quantity ||
    files.length === 0
  ) {
    return next(
      new SendError("All fields and at least one image are required", 400)
    );
  }
  try {
    const uploadResults = await uploadFile(files);
    const images = uploadResults.map((file) => ({
      public_id: file.public_id,
      url: file.url,
    }));
    const product = await Product.create({
      name,
      description,
      price,
      brand,
      stock,
      quantity,
      images,
    });
    res.status(201).json({
      success: true,
      message: "Product Created Successfully",
      product,
    });
  } catch (error) {
    return next(new SendError(error.message || "Failed to upload files", 500));
  }
});
