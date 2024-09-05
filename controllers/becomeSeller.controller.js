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
  )
    return res.status(401).json({ message: "All fields are required" });
  try {
    const id = req.user.user;

    if (id === userId) {
      const existingSeller = await BecomeSellerModel.findOne({
        $or: [{ userId: id }, { storeEmail: storeEmail }],
      });

      if (existingSeller) {
        if (existingSeller.userId === id) {
          return res
            .status(403)
            .json({ message: "Seller is already registered with this user" });
        } else if (existingSeller.storeEmail === storeEmail) {
          return res
            .status(403)
            .json({ message: "Seller is already registered with this email" });
        }
      }

      const hashedPassword = await bcrypt.hash(storePassword, 12);
      req.body.storePassword = hashedPassword;

      const newSeller = new BecomeSellerModel(req.body);
      await newSeller.save();
      const sellerRes = newSeller._doc;
      delete sellerRes.storePassword;
      return res
        .status(201)
        .json({ message: "seller registerd successfully", seller: sellerRes });
    } else {
      return res
        .status(404)
        .json({ message: "Invalid token for to create seller" });
    }
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ message: "Internal server error during Creating the seller" });
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

    const sellerRes = seller._doc;
    delete sellerRes.storePassword;

    return res
      .status(200)
      .json({ message: "Seller found successfully", seller: sellerRes });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ message: "Internal server error during getting seller" });
  }
};

export const GetSellerById = async (req, res) => {
  try {
    const { id } = req.params
    const seller = await BecomeSellerModel.findById(id)
    if (!seller) return res.status(404).json({ message: "store not found" })
    const sellerRes = seller._doc
    delete sellerRes.storePassword
    return res.status(200).json({ message: "store found successfully", seller: sellerRes })
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ message: "Internal server error during Creating the seller" });
  }
}

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
    const sellerRes = seller._doc;
    delete sellerRes.storePassword;
    return res
      .status(200)
      .json({ message: "Seller updated successfully", seller: sellerRes });
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
