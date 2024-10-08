import { UserModel } from "../model/user.model.js";
import { AddressModel } from "../model/address.model.js";
import { BecomeSellerModel } from "../model/becomeSeller.model.js";
import bcrypt from "bcryptjs";

export const getUser = async (req, res) => {
  try {
    const userId = req.user.user;
    const user = await UserModel.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    const userResponse = {
      _id: user._id,
      email: user.email,
      userName: user.userName,
    };

    return res
      .status(200)
      .json({ message: "User response", user: userResponse });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ message: "Internal server error during the user retrieval" });
  }
};

export const UpdateUserProfile = async (req, res) => {
  try {
    const id = req.params.id;
    const { password, newPassword } = req.body;

    const user = await UserModel.findById(id);

    if (!user) return res.status(404).json({ message: "user not found" });

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return res.status(403).json({ message: "Invalid password" });
    }
    const salt = await bcrypt.genSalt(12);
    const hashPassword = await bcrypt.hash(newPassword, salt);

    user.password = hashPassword;
    await user.save();

    const userResponse = {
      _id: user._id,
      email: user.email,
      userName: user.userName,
    };

    return res
      .status(200)
      .json({ message: "User updated successfully", user: userResponse });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ message: "Internal server error during updating the user" });
  }
};

export const UserInfo = async (req, res) => {
  try {
    const id = req.user.user;
    const user = await UserModel.findById(id);
    const address = await AddressModel.findOne({ userId: id });
    const seller = await BecomeSellerModel.findOne({ userId: id });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const userResponse = { ...user._doc };
    delete userResponse.password;

    const sellerResponse = seller ? { ...seller._doc } : null;
    if (sellerResponse) {
      delete sellerResponse.storePassword;
    }

    res.status(200).json({
      message: "userInfo fetched successfully",
      user: userResponse,
      address: address,
      seller: sellerResponse,
    });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ message: "Internal server error during getting the user info" });
  }
};
