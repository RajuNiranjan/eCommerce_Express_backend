import { WishListModel } from '../model/wishList.model.js'
import { ProductModel } from '../model/product.model.js'


export const AddToWishList = async (req, res) => {
    const id = req.user.user
    const { userId, productId } = req.body
    try {

        if (id === userId) {

            const existedWishListProduct = await WishListModel.findOne({ userId, productId })

            if (!existedWishListProduct) {
                const product = await ProductModel.findById(productId)
                if (!product) return res.status(404).json({ message: "Product not found" })
                const wishListItem = new WishListModel({ userId, productId })
                await wishListItem.save()
                return res.status(200).json({ message: "Product added to wish list successfully" })
            } else {
                return res.status(403).json({ message: "Product already existed in wish list" })
            }
        } else {
            return res.status(401).json({ message: "Unauthorized access" })
        }
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal server error" })
    }
}

export const GetWishListItems = async (req, res) => {
    const id = req.user.user
    const { userId } = req.params

    try {
        if (id === userId) {
            const wishListItems = await WishListModel.find({ userId })
            if (!wishListItems) return res.status(404).json({ message: "No wishList items found" })

            const productIds = wishListItems.map(item => item.productId)
            const products = await ProductModel.find({ _id: { $in: productIds } })

            return res.status(200).json({ message: "Wishlist fetched successfully", wishList: products })
        } else {
            return res.status(401).json({ message: "Unauthorized access" });
        }
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal server error during fetching the wish list" })
    }
}


export const removeFromWishList = async (req, res) => {
    const user = req.user.user
    const { userId, productId } = req.params
    try {
        if (user === userId) {
            const result = await WishListModel.deleteOne({ userId, productId })
            if (result.deletedCount === 0) return res.status(404).json({ message: "WishList item not found" })
            return res.status(200).json({ message: "WishList item removed successfully" })
        } else {
            return res.status(401).json({ message: "Unauthorized access" })
        }
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal server error during removing from the wish list" })
    }
}