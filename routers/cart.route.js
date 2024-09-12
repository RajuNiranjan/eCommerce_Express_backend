import express from 'express'
import { VerifyToken } from '../utils/verifyToken.js'
import { AddToCart, GetProducts, RemoveFromCart } from '../controllers/cart.controller.js'

export const CartRouter = express.Router()

CartRouter.post("/", VerifyToken, AddToCart)
CartRouter.get("/:userId", VerifyToken, GetProducts)
CartRouter.delete("/:userId/remove/:productId", VerifyToken, RemoveFromCart)