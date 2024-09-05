import express from "express";
import {
  CreateSeller,
  DeleteSeller,
  GetSeller,
  GetSellerById,
  UpdateSeller,
} from "../controllers/becomeSeller.controller.js";
import { VerifyToken } from "../utils/verifyToken.js";

export const BecomeSellerRouter = express.Router();

BecomeSellerRouter.post("/", VerifyToken, CreateSeller);
BecomeSellerRouter.get("/", VerifyToken, GetSeller);
BecomeSellerRouter.get("/:id", VerifyToken, GetSellerById);
BecomeSellerRouter.patch("/:id", VerifyToken, UpdateSeller);
BecomeSellerRouter.delete("/:id", VerifyToken, DeleteSeller);
