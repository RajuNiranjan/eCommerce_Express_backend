import jwt from 'jsonwebtoken'
import { ENV_VAR } from '../config/envVar.js'

export const VerifyToken = async (req, res, next) => {
    try {
        const token = req.header("Authorization").replace("Bearer ", "");

        if (!token) return res.status(401).json({ message: "Token is required" })

        const decodedToken = jwt.verify(token, ENV_VAR.JWT_SECRET_KEY)
        req.user = decodedToken
        next()
    } catch (error) {
        console.error(error);
        return res.status(401).json({ message: "Invalid token" })
    }
}