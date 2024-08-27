import express from 'express'
import { VerifyToken } from '../utils/verifyToken.js'
import { getUser } from '../controllers/user.controller.js'

export const UserRouter = express.Router()

UserRouter.get('/', VerifyToken, getUser)