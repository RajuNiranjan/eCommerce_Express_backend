import mongoose from "mongoose";

const AddressSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    addressLine1: {
      type: String,
      required: true,
    },
    addressLine2: {
      type: String,
      required: false,
    },
    landMark: {
      type: String,
      required: false,
    },
    doorNo: {
      type: String,
      required: true,
    },
    mobileNumber: {
      type: String,
      required: true,
    },
    userId: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export const AddressModel = mongoose.model("Address", AddressSchema);
