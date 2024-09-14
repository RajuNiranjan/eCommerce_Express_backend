import { BecomeSellerModel } from "../model/becomeSeller.model.js";
import { ProductModel } from "../model/product.model.js";

export const CreateProduct = async (req, res) => {
  const {
    productName,
    description,
    categories,
    size,
    price,
    offerPrice,
    stockLevel,
    images,
    colors,
    fabric,
    brand,
    saleType,
    userId,
    storeId,
  } = req.body;

  const parsedPrice = parseFloat(price);
  const parsedOfferPrice = parseFloat(offerPrice);
  const parsedStockLevel = parseInt(stockLevel);

  if (
    !productName ||
    !description ||
    !categories ||
    !Array.isArray(size) ||
    isNaN(parsedPrice) ||
    isNaN(parsedOfferPrice) ||
    isNaN(parsedStockLevel) ||
    !images ||
    !Array.isArray(images) ||
    !colors ||
    !Array.isArray(colors) ||
    !fabric ||
    !brand ||
    !saleType ||
    !userId ||
    !storeId
  ) {
    return res
      .status(400)
      .json({ message: "Please fill in all required fields with valid data." });
  }

  try {
    const newProduct = new ProductModel({
      productName,
      description,
      categories,
      size,
      price: parsedPrice,
      offerPrice: parsedOfferPrice,
      stockLevel: parsedStockLevel,
      images,
      colors,
      fabric,
      brand,
      saleType,
      userId,
      storeId,
    });

    const store = await BecomeSellerModel.findOne({ _id: storeId });

    if (!store) {
      return res.status(404).json({ message: "Store not found" });
    }

    const savedProduct = await newProduct.save();

    return res
      .status(201)
      .json({ message: "Product created successfully", product: savedProduct });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ message: "Internal server error during creating product" });
  }
};

export const getProductsByStoreId = async (req, res) => {
  try {
    const { id } = req.params;
    const products = await ProductModel.find({ storeId: id });
    if (products.length === 0) {
      return res
        .status(404)
        .json({ message: "No products found for the given storeId." });
    }
    return res.status(200).json({
      message: "Products data fetched successfully",
      products: products,
    });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ message: "Internal server error while fetching products." });
  }
};
export const DeleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await ProductModel.findByIdAndDelete(id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    return res
      .status(200)
      .json({ message: "Product deleted successfully", product });
  } catch (error) {
    console.error("Error while deleting product:", error);
    return res
      .status(500)
      .json({ message: "Internal server error while deleting product." });
  }
};

export const GetAllProducts = async (req, res) => {
  try {
    const product = await ProductModel.find();
    return res
      .status(200)
      .json({ message: "Fetched all the products", products: product });
  } catch (error) {
    console.error("Error while deleting product:", error);
    return res
      .status(500)
      .json({ message: "Internal server error while fetching all product." });
  }
};

export const GetProductById = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await ProductModel.findById(id);
    if (!product) return res.status(404).json({ message: "Product not found" });
    return res.status(200).json({ message: "product found", product: product });
  } catch (error) {
    console.error("Error while deleting product:", error);
    return res
      .status(500)
      .json({ message: "Internal server error while fetching the product." });
  }
};

export const EditProduct = async (req, res) => {
  const {
    productName,
    description,
    categories,
    size,
    price,
    offerPrice,
    stockLevel,
    images,
    colors,
    fabric,
    brand,
    saleType,
    userId,
    storeId,
  } = req.body;

  const parsedPrice = parseFloat(price);
  const parsedOfferPrice = parseFloat(offerPrice);
  const parsedStockLevel = parseInt(stockLevel);

  if (
    !productName ||
    !description ||
    !categories ||
    !Array.isArray(size) ||
    isNaN(parsedPrice) ||
    isNaN(parsedOfferPrice) ||
    isNaN(parsedStockLevel) ||
    !images ||
    !Array.isArray(images) ||
    !colors ||
    !Array.isArray(colors) ||
    !fabric ||
    !brand ||
    !saleType ||
    !userId ||
    !storeId
  ) {
    return res
      .status(400)
      .json({ message: "Please fill in all required fields with valid data." });
  }

  try {
    const { id } = req.params;
    console.log("id", id);

    const product = await ProductModel.findById(id);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    product.productName = productName;
    product.description = description;
    product.categories = categories;
    product.size = size;
    product.price = parsedPrice;
    product.offerPrice = parsedOfferPrice;
    product.stockLevel = parsedStockLevel;
    product.images = images;
    product.colors = colors;
    product.fabric = fabric;
    product.brand = brand;
    product.saleType = saleType;
    product.userId = userId;
    product.storeId = storeId;

    const updatedProduct = await product.save();

    return res.status(200).json({
      message: "Product updated successfully",
      product: updatedProduct,
    });
  } catch (error) {
    console.error("Error while updating product:", error);
    return res.status(500).json({
      message: "Internal server error while updating the product.",
    });
  }
};

export const GetByCategory = async (req, res) => {
  try {
    const { category } = req.params;
    const products = await ProductModel.find({ categories: category });
    return res
      .status(200)
      .json({ message: "Products fetched successfully", product: products });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};
