import mongoose from "mongoose";

const AddressSchema = new mongoose.Schema(
    {
        addressLine1: {
            type: String,
            required: true
        },
        addressLine2: {
            type: String,
            required: false
        },
        landMark: {
            type: String,
            required: false
        },
        doorNo: {
            type: String,
            required: true
        },
        mobileNumber: {
            type: String,
            required: true
        },
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true
        }
    }
    , { timestamps: true })

export const AddressModel = mongoose.model("Address", AddressSchema)