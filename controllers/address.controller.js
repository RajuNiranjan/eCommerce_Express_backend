import { AddressModel } from "../model/address.model.js";
export const CreateAddress = async (req, res) => {
  try {
    const id = req.user.user
    const existingAddress = await AddressModel.findOne({ userId: id })

    if (existingAddress) return res.status(400).json({ message: "Address already exists for this user" });

    const newAddress = new AddressModel(req.body)
    await newAddress.save()

    return res.status(201).json({ message: "Address Added successfully", address: newAddress })

  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error during creating address" })
  }
}

export const getUserAddress = async (req, res) => {
  try {
    const id = req.user.user

    const address = await AddressModel.findOne({ userId: id })

    if (!address) return res.status(404).json({ message: "Please add the address" })

    return res.status(200).json({ message: "Address found successfully", address: address })

  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error during getting the address" })
  }
}

export const updateUserAddress = async (req, res) => {
  try {
    const { id } = req.params

    const address = await AddressModel.findByIdAndUpdate(id, req.body, { new: true })

    if (!address) return res.status(404).json({ message: "Please add the address" })
    return res.status(200).json({ message: "address updated successfully", address: address })

  }
  catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error during getting the address" })
  }
}

export const DeleteUserAddress = async (req, res) => {
  try {
    const { id } = req.params

    const address = await AddressModel.findOneAndDelete(id)

    if (!address) return res.status(404).json({ message: "address not found" })

    return res.status(200).json({ message: "address deleted successfully", address: address })

  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error during deleting the address" })
  }
}
