import mongoose from "mongoose";
import { AddressModel } from "../model/address.model.js";
import { UserModel } from "../model/user.model.js";

export const CreateAddress = async (req, res) => {
  const {
    name,
    addressLine1,
    addressLine2,
    landMark,
    doorNo,
    mobileNumber,
    userId,
  } = req.body;

  if (
    !name ||
    !addressLine1 ||
    !addressLine2 ||
    !landMark ||
    !doorNo ||
    !mobileNumber ||
    !userId
  ) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    const id = req.user.user;
    const usersId = await UserModel.findById(id);

    const user = usersId._id.toString() === id;

    if (user) {
      const existingAddress = await AddressModel.findOne({ userId });

      if (existingAddress) {
        return res
          .status(400)
          .json({ message: "Address already exists for this user" });
      }

      const newAddress = new AddressModel({
        name,
        addressLine1,
        addressLine2,
        landMark,
        doorNo,
        mobileNumber,
        userId,
      });

      await newAddress.save();

      return res
        .status(201)
        .json({ message: "Address added successfully", address: newAddress });
    }

    return res.status(404).json({ message: "Invalid User" });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Internal server error during creating address" });
  }
};

export const getUserAddress = async (req, res) => {
  try {
    const id = req.user.user;
    const usersId = await UserModel.findById(id);

    const user = usersId._id.toString() === id;
    console.log("users", user);

    if (user) {
      const address = await AddressModel.findOne({ userId: id });

      console.log("address", address);

      if (!address)
        return res.status(404).json({ message: "Please add the address" });

      return res
        .status(200)
        .json({ message: "Address found successfully", address });
    }

    return res.status(404).json({ message: "Invalid user" });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Internal server error during getting the address" });
  }
};

export const updateUserAddress = async (req, res) => {
  const { name, addressLine1, addressLine2, landMark, doorNo, mobileNumber } =
    req.body;

  if (
    !name ||
    !addressLine1 ||
    !addressLine2 ||
    !landMark ||
    !doorNo ||
    !mobileNumber
  ) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    const { id } = req.params;

    const address = await AddressModel.findByIdAndUpdate(id, req.body, {
      new: true,
    });

    if (!address) return res.status(404).json({ message: "Address not found" });

    return res
      .status(200)
      .json({ message: "Address updated successfully", address });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Internal server error during updating the address" });
  }
};

export const DeleteUserAddress = async (req, res) => {
  try {
    const { id } = req.params;

    const address = await AddressModel.findByIdAndDelete(id);

    if (!address) return res.status(404).json({ message: "Address not found" });

    return res
      .status(200)
      .json({ message: "Address deleted successfully", address });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Internal server error during deleting the address" });
  }
};
