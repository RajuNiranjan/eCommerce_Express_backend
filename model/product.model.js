import mongoose, { Schema } from "mongoose";

const productSchema = new Schema({
    productName: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    categories: {
        type: [String],
        required: true
    },
    size: {
        type: [String],
        default: []
    },
    price: {
        type: Number,
        required: true
    },
    offerPrice: {
        type: Number,
        required: true
    },
    stockLevel: {
        type: Number,
        required: true
    },
    images: {
        type: [String],
        default: []
    },
    colors: {
        type: [String],
        default: []
    },
    userId: {
        type: String,
        ref: 'User',
        required: true
    },
    storeId: {
        type: String,
        ref: 'Store',
        required: true
    }
}, { timestamps: true });

export const ProductModel = mongoose.model('Product', productSchema);


