import { BecomeSellerModel } from "../model/becomeSeller.model.js";
import bcrypt from "bcryptjs";

export const CreateSeller = async (req, res) => {
  const {
    businessName,
    storeName,
    storeEmail,
    storeAddress,
    storeDescription,
    storePassword,
    userId,
  } = req.body;

  if (
    !businessName ||
    !storeName ||
    !storeEmail ||
    !storeAddress ||
    !storeDescription ||
    !storePassword ||
    !userId
  ) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    const existingSeller = await BecomeSellerModel.findOne({
      $or: [{ userId }, { storeEmail: storeEmail }],
    });

    if (existingSeller) {
      return res.status(409).json({
        message: "A store is already registered with this user or email",
      });
    }

    const hashedPassword = await bcrypt.hash(storePassword, 12);

    const newSeller = new BecomeSellerModel({
      ...req.body,
      storePassword: hashedPassword,
    });

    await newSeller.save();

    return res
      .status(201)
      .json({ message: "Store created successfully", seller: newSeller });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ message: "Internal server error during creating seller" });
  }
};

export const GetSeller = async (req, res) => {
  try {
    const id = req.user.user;
    const seller = await BecomeSellerModel.findOne({ userId: id });

    if (!seller)
      return res
        .status(404)
        .json({ message: "You must become a seller to sell products" });

    return res
      .status(200)
      .json({ message: "Seller found successfully", seller: seller });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ message: "Internal server error during getting seller" });
  }
};

export const UpdateSeller = async (req, res) => {
  const {
    businessName,
    storeName,
    storeEmail,
    storeAddress,
    storeDescription,
    storePassword,
  } = req.body;

  if (
    !businessName ||
    !storeName ||
    !storeEmail ||
    !storeAddress ||
    !storeDescription ||
    !storePassword
  ) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    const { id } = req.params;
    const seller = await BecomeSellerModel.findByIdAndUpdate(id, req.body, {
      new: true,
    });

    if (!seller) {
      return res
        .status(404)
        .json({ message: "You must become a seller to sell products" });
    }

    return res
      .status(200)
      .json({ message: "Seller updated successfully", seller: seller });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Internal server error during updating the seller",
    });
  }
};

export const DeleteSeller = async (req, res) => {
  try {
    const { id } = req.params;
    const seller = await BecomeSellerModel.findOneAndDelete(id);
    if (!seller)
      return res
        .status(404)
        .json({ message: "You must become a seller to sell products" });
    return res
      .status(200)
      .json({ message: "Seller found successfully", seller: seller });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ message: "Internal server error during deleting the seller" });
  }
};
