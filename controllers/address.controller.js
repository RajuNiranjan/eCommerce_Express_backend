import { AddressModel } from "../model/address.model.js";
import { UserModel } from '../model/user.model.js'

export const AddAddress = async (req, res) => {
    const reqId = req.user.user;
    console.log(reqId);
    const { id } = req.params;

    const { addressLine1, addressLine2, mobileNumber, landMark, doorNo, userId } = req.body;

    if (!addressLine1 || !addressLine2 || !mobileNumber || !landMark || !doorNo || !userId) {
        return res.status(400).json({ message: "all fields are required" });
    }

    try {

        if (reqId === id) {
            const user = await UserModel.findById(id);

            if (!user) {
                return res.status(404).json({ message: "user not found" });
            }

            const address = new AddressModel(req.body);
            await address.save();
            return res.status(201).json({ message: "Address Added Successfully", address: address });
        }

        return res.status(401).json({ message: "invalid token" })

    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal server error during adding address" });
    }
}

export const getAddress = async (req, res) => {
    const id = req.user.user
    if (!id) return res.status(401).json({ message: "invalid token" })
    try {

        const user = await UserModel.findById(id)

        if (!user) return res.status(404).json({ message: "user not found" })

        const addresses = await AddressModel.findOne({ userId: id });
        if (!addresses) return res.status(404).json({ message: "Please add the address" });
        return res.status(200).json({ message: "Addresses fetched successfully", addresses: addresses });

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal server error during fetching address" })
    }
}
export const updateAddress = async (req, res) => {
    const { id } = req.params;
    try {
        const address = await AddressModel.findByIdAndUpdate(id, req.body, { new: true });
        if (!address) {
            return res.status(404).json({ message: "address not found" });
        }
        return res.status(200).json({ message: "Address Updated Successfully", address: address });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal server error during updating address" });
    }
}
export const deleteAddress = async (req, res) => {
    const { id } = req.params;
    try {
        const add = await AddressModel.findById(id)
        console.log("adsf", add);
        const address = await AddressModel.findByIdAndDelete(id);
        console.log("addf", address);
        if (!address) {
            return res.status(404).json({ message: "address not found" });
        }
        return res.status(200).json({ message: "Address deleted successfully", address: address });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal server error during deleting address" });
    }
}