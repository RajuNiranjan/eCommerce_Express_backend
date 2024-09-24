import { BecomeSellerModel } from "../model/becomeSeller.model.js";


export const CreateSeller = async (req, res) => {
  const {
    bussinessName,
    storeName,
    storeEmail,
    storeAddress,
    storeDescription,
    storePassword,
    userId,
  } = req.body;
  if (
    !bussinessName ||
    !storeName ||
    !storeEmail ||
    !storeAddress ||
    !storeDescription ||
    !storePassword ||
    !userId
  ) {
    return res.status(404).json({ message: "All fields are required" })
  }
  try {
    const id = req.user.user

    if (req.body.userId === id) {

      const existingSeller = await BecomeSellerModel.findOne(

        {
          $or: [{ userId: req.body.userId }, { storeEmail: req.body.storeEmail }],
        }
      )




      if (existingSeller) {

        return res.status(403).json({ message: "the Store is already exited with this email or with user id" })
      } else {
        const newSeller = new BecomeSellerModel(req.body)
        await newSeller.save()
        return res.status(201).json({ message: "Seller registration successfully", seller: newSeller })

      }
    } else {
      return res.status(401).json({ message: "Invalid User" })
    }
  } catch (error) {
    console.log("while creating the seller error", error
    );
    return res.status(500).json({ message: "Internal server error during while Registering to Seller", })
  }
}

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
