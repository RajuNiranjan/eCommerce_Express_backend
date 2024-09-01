import express from "express";
import {
  CreateAddress,
  DeleteUserAddress,
  getUserAddress,
  updateUserAddress,
} from "../controllers/address.controller.js";
import { VerifyToken } from "../utils/verifyToken.js";

export const AddressRouter = express.Router();

AddressRouter.post("/", VerifyToken, CreateAddress);
AddressRouter.get("/", VerifyToken, getUserAddress);
AddressRouter.patch("/:id", VerifyToken, updateUserAddress);
AddressRouter.delete("/:id", VerifyToken, DeleteUserAddress);
