import { BecomeSellerModel } from "../model/becomeSeller.model.js";

export const CreateSeller = async (req, res) => {
    try {
        const id = req.user.user
        if (!req.body) return res.status(400).json({ message: "all fields are required" })

        const existingSeller = await BecomeSellerModel.findOne({ $or: [{ userId: id }, { storeEmail: req.body.storeEmail }] });

        if (existingSeller) return res.status(409).json({ message: "A store is already registered with this user" });

        const newSeller = new BecomeSellerModel(req.body)

        await newSeller.save()

        return res.status(201).json({ message: "store created successfully", seller: newSeller })

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal server error during creating seller" })
    }
}

export const GetSeller = async (req, res) => {
    try {
        const id = req.user.user
        const seller = await BecomeSellerModel.findOne({ userId: id })

        if (!seller) return res.status(404).json({ message: "You must become a seller to sell products" })

        return res.status(200).json({ message: "Seller found successfully", seller: seller })

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal server error during getting seller" })
    }
}

export const UpdateSeller = async (req, res) => {
    try {
        const { id } = req.params
        const seller = await BecomeSellerModel.findByIdAndUpdate(id, req.body, { new: true })

        if (!seller) return res.status(404).json({ message: "You must become a seller to sell products" })
        return res.status(200).json({ message: "Seller updated successfully", seller: seller })
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal server error during updating the seller" })
    }
}

export const DeleteSeller = async (req, res) => {
    try {
        const { id } = req.params
        const seller = await BecomeSellerModel.findOneAndDelete(id)
        if (!seller) return res.status(404).json({ message: "You must become a seller to sell products" })
        return res.status(200).json({ message: "Seller found successfully", seller: seller })
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal server error during deleting the seller" })
    }
}