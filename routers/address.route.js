import express from 'express'
import { AddAddress, getAddress, updateAddress, deleteAddress } from '../controllers/address.controller.js'
import { VerifyToken } from '../utils/verifyToken.js'

export const AddressRouter = express.Router()

AddressRouter.post('/:id', VerifyToken, AddAddress)
AddressRouter.get('/:id', VerifyToken, getAddress)
AddressRouter.patch('/:id', updateAddress)
AddressRouter.delete('/:id', deleteAddress)