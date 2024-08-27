import jwt from 'jsonwebtoken'
import { ENV_VAR } from '../config/envVar.js'

export const generateToken = (id) => {

    if (!ENV_VAR.JWT_SECRET_KEY || !ENV_VAR.JWT_EXPIRES_IN) {
        throw new Error('Missing JWT secret key or expiration time in environment variables');
    }
    const payload = { user: id };

    const token = jwt.sign(payload, ENV_VAR.JWT_SECRET_KEY, { expiresIn: ENV_VAR.JWT_EXPIRES_IN });

    return token;
}