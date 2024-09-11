import { CartModel } from '../model/cart.model.js'
import { ProductModel } from '../model/product.model.js'


export const AddToCart = async (req, res) => {
    const id = req.user.user
    const { userId, productId } = req.body
    try {

        if (id === userId) {

            const existedCartProduct = await CartModel.findOne({ userId, productId })

            if (!existedCartProduct) {
                const product = await ProductModel.findById(productId)
                if (!product) return res.status(404).json({ message: "Product not found" })
                const CartItem = new CartModel({ userId, productId })
                await CartItem.save()
                return res.status(200).json({ message: "Product added to cart list successfully" })
            } else {
                return res.status(403).json({ message: "Product already existed in cart list" })
            }
        } else {
            return res.status(401).json({ message: "Unauthorized access" })
        }
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal server error" })
    }
}

export const GetCartItems = async (req, res) => {
    const id = req.user.user
    const { userId } = req.params

    try {
        if (id === userId) {
            const CartItems = await CartModel.find({ userId })
            if (!CartItems) return res.status(404).json({ message: "No Cart items found" })

            const productIds = CartItems.map(item => item.productId)
            const products = await ProductModel.find({ _id: { $in: productIds } })

            return res.status(200).json({ message: "Cart fetched successfully", Cart: products })
        } else {
            return res.status(401).json({ message: "Unauthorized access" });
        }
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal server error during fetching the cart list" })
    }
}


export const removeFromCart = async (req, res) => {
    const user = req.user.user
    const { userId, productId } = req.params
    try {
        if (user === userId) {
            const result = await CartModel.deleteOne({ userId, productId })
            if (result.deletedCount === 0) return res.status(404).json({ message: "Cart item not found" })
            return res.status(200).json({ message: "Cart item removed successfully" })
        } else {
            return res.status(401).json({ message: "Unauthorized access" })
        }
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal server error during removing from the wish list" })
    }
}