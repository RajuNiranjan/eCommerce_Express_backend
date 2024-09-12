import mongoose, { Schema } from "mongoose"

const cartItemSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    productId: {
        type: Schema.Types.ObjectId,
        ref: "Product",
        required: true,
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
        required: true
    },

}, { timestamps: true })

export const CartModel = mongoose.model("CartItem", cartItemSchema)