import express from 'express'
import { AddAddress } from '../controllers/address.controller.js'
import { VerifyToken } from '../utils/verifyToken.js'

export const AddressRouter = express.Router()

AddressRouter.post('/:id', VerifyToken, AddAddress)