import jwt from "jsonwebtoken";
import { ENV_VAR } from "../config/envVar.js";

export const VerifyToken = async (req, res, next) => {
  try {
    const authHeader = req.header("Authorization");
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({
        message: "Token is required and must be in the correct format",
      });
    }

    const token = authHeader.replace("Bearer ", "");
    const decodedToken = jwt.verify(token, ENV_VAR.JWT_SECRET_KEY);

    req.user = decodedToken;
    next();
  } catch (error) {
    console.error("JWT Verification Error:", error);
    return res.status(401).json({ message: "Invalid token" });
  }
};
