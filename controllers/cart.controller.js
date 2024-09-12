import { CartModel } from '../model/cart.model.js';
import { ProductModel } from '../model/product.model.js';

export const AddToCart = async (req, res) => {
    const id = req.user.user
    const { userId, productId, quantity, color, size } = req.body

    try {
        if (id !== userId) {
            return res.status(403).json({ message: "Invalid user" })
        }

        const existingProduct = await CartModel.findOne({ productId })

        if (!existingProduct) {
            const product = await ProductModel.findById(productId)
            if (!product) return res.status(404).json({ message: "Product not found" })

            const cartItem = new CartModel({
                productId,
                userId,
                quantity,
                size,
                color
            })
            await cartItem.save()
            return res.status(200).json({ message: "Product Added To cart Successfully" })
        } else {
            return res.status(409).json({ message: "Product already existed in cart" })
        }
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal server error" })
    }
}

export const GetProducts = async (req, res) => {
    const id = req.user.user
    const { userId } = req.params
    try {
        if (id !== userId) return res.status(404).json({ message: "Invalid user" })
        const cartItems = await CartModel.find({ userId })
        return res.status(200).json({ message: "Cart Items Fetched Successfully", cartItems: cartItems })
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal server error" })
    }
}
export const RemoveFromCart = async (req, res) => {
    const { userId, productId } = req.params

    try {
        const removeFromCart = await CartModel.deleteOne({ userId, productId })
        if (removeFromCart.deletedCount === 0) return res.status(404).json({ message: "Cart item not found" })
        return res.status(200).json({ message: "Item removed from cart successfully" })

    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal server error" })
    }
}