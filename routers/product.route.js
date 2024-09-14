import express from "express";
import {
  CreateProduct,
  getProductsByStoreId,
  DeleteProduct,
  GetAllProducts,
  GetProductById,
  EditProduct,
  GetByCategory,
} from "../controllers/product.controller.js";
import { VerifyToken } from "../utils/verifyToken.js";

export const ProductRouter = express.Router();

ProductRouter.post("/", VerifyToken, CreateProduct);
ProductRouter.get("/:id", VerifyToken, getProductsByStoreId);
ProductRouter.delete("/:id", VerifyToken, DeleteProduct);
ProductRouter.get("/", GetAllProducts);
ProductRouter.get("/category/:category", GetByCategory);
ProductRouter.get("/singel_product/:id", GetProductById);
ProductRouter.patch("/:id", VerifyToken, EditProduct);
