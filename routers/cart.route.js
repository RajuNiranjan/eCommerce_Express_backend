import express from 'express'
import { VerifyToken } from '../utils/verifyToken.js'
import { AddToCart, GetCartItems, removeFromCart } from '../controllers/cart.controller.js'

export const CartRouter = express.Router()

CartRouter.post("/", VerifyToken, AddToCart)
CartRouter.get("/:userId", VerifyToken, GetCartItems)
CartRouter.delete("/:userId/remove/:productId", VerifyToken, removeFromCart)