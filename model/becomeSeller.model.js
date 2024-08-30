import mongoose from "mongoose";

const becomeSellerSchema = new mongoose.Schema({
    bussinessName: { type: String, required: true, unique: true },
    storeName: { type: String, required: true, unique: true },
    storeEmail: { type: String, required: true, unique: true },
    storeAddress: { type: String, required: true, },
    storeDescription: { type: String, required: true, },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', requiredd: true }
})

export const BecomeSellerModel = mongoose.model("BecomeSeller", becomeSellerSchema)