import dotenv from 'dotenv'

dotenv.config()

export const ENV_VAR = {
    DB_URI: process.env.DB_URI,
    PORT: process.env.PORT,
    JWT_SECRET_KEY: process.env.JWT_SECRET_KEY,
    JWT_EXPIRES_IN: process.env.JWT_EXPIRES_IN,
    ORIGIN: process.env.ORIGIN
}