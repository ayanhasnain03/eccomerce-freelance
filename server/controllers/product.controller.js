import { asyncHandler } from "../middlewares/error.js";
import Category from "../models/category.model.js";
import Product from "../models/product.model.js";
import { uploadFile } from "../utils/features.js";
import { SendError } from "../utils/sendError.js";

export const getProducts = asyncHandler(async (req, res, next) => {
  const { category, price, brand, sort } = req.query;

  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const skip = (page - 1) * limit;

  const baseQuery = {};

  if (category) {
    const categoryId = await Category.findOne({ name: category }).select("_id");
    if (categoryId) {
      baseQuery.category = categoryId;
    }
  }

  if (price) {
    baseQuery.price = { $lte: Number(price) }; // Correct price filter
  }

  if (brand) {
    baseQuery.brand = brand;
  }

  // Sort Query
  let sortQuery = { createdAt: -1 };

  if (sort) {
    switch (sort) {
      case "price-asc":
        sortQuery = { price: 1 };
        break;
      case "price-desc":
        sortQuery = { price: -1 };
        break;
      case "rating-asc":
        sortQuery = { rating: 1 };
        break;
      case "rating-desc":
        sortQuery = { rating: -1 };
        break;
      case "createdAt_asc":
        sortQuery = { createdAt: 1 };
        break;
      case "createdAt_desc":
        sortQuery = { createdAt: -1 };
        break;
      default:
        sortQuery = { createdAt: -1 };
    }
  }

  const products = await Product.find(baseQuery)
    .sort(sortQuery)
    .skip(skip)
    .limit(limit)
    .populate("category", "name");

  const totalProducts = await Product.countDocuments(baseQuery);
  const totalPage = Math.ceil(totalProducts / limit);

  res.status(200).json({
    totalPage,
    totalProducts,
    products,
  });
});

export const createProduct = asyncHandler(async (req, res, next) => {
  const files = req.files || [];
  const { name, description, price, brand, stock, quantity, category, sizes } =
    req.body;
  const categoryID = await Category.findOne({ name: category }).select("_id");
  if (!categoryID) {
    return next(new SendError("Category not found", 404));
  }
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
      sizes,
      category: categoryID,
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
