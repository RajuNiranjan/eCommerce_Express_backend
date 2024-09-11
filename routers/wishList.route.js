import express from 'express'
import { AddToWishList, GetWishListItems, removeFromWishList } from '../controllers/wishList.controller.js'
import { VerifyToken } from '../utils/verifyToken.js'


export const WishListRouter = express.Router()

WishListRouter.post("/", VerifyToken, AddToWishList)
WishListRouter.get("/:userId", VerifyToken, GetWishListItems)
WishListRouter.delete("/:userId/remove/:productId", VerifyToken, removeFromWishList)