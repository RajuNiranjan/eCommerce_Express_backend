import mongoose, { Schema } from "mongoose";

const cartItemSchema = new Schema({
    product: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Product'
    },
    quantity: {
        type: Number,
        required: true,
        default: 1
    },
    size: {
        type: String,
        required: true,
    },
    color: {
        type: String,
        required: true,
    },
})

const cartSchema = new Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    productItems: [cartItemSchema],
}, { timestamps: true })

export const CartModel = mongoose.model("CartList", cartSchema)