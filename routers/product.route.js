import express from 'express'
import { CreateProduct, getProductsByStoreId } from '../controllers/product.controller.js'
import { VerifyToken } from '../utils/verifyToken.js'


export const ProductRouter = express.Router()

ProductRouter.post('/', VerifyToken, CreateProduct)
ProductRouter.get('/:id', VerifyToken, getProductsByStoreId)