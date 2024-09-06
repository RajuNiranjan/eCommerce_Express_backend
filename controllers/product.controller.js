import { BecomeSellerModel } from "../model/becomeSeller.model.js";
import { ProductModel } from "../model/product.model.js";

export const CreateProduct = async (req, res) => {
    const {
        productName,
        description,
        categories,
        size,
        price,
        offerPrice,
        stockLevel,
        images,
        colors,
        userId,
        storeId
    } = req.body;


    if (
        !productName ||
        !description ||
        !categories ||
        !Array.isArray(categories) ||
        !size ||
        !Array.isArray(size) ||
        typeof price !== 'number' ||
        typeof offerPrice !== 'number' ||
        typeof stockLevel !== 'number' ||
        !images ||
        !Array.isArray(images) ||
        !colors ||
        !Array.isArray(colors) ||
        !userId ||
        !storeId
    ) {
        return res.status(400).json({ message: 'Please fill in all required fields with valid data.' });
    }

    try {

        const newProduct = new ProductModel({
            productName,
            description,
            categories,
            size,
            price,
            offerPrice,
            stockLevel,
            images,
            colors,
            userId,
            storeId
        });

        const store = await BecomeSellerModel.findOne({ _id: storeId })

        if (!store) return res.status(404).json({ message: "Store not found" })

        const savedProduct = await newProduct.save();


        return res.status(201).json({ message: "Product created successfully", product: savedProduct });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal server error during creating product" });
    }
}
