
import mongoose, { mongo, Schema } from "mongoose";

const becomeSellecrSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, required: true },
  bussinessName: { type: String, required: true },
  storeName: { type: String, required: true },
  storeEmail: { type: String, required: true, unique: true },
  storeAddress: { type: String, required: true },
  storeDescription: { type: String, required: true },
  storePassword: { type: String, required: true },
}, { timestamps: true })

export const BecomeSellerModel = mongoose.model("BecomeSeller", becomeSellecrSchema)