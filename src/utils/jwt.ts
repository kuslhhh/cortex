import jwt from "jsonwebtoken"
import "dotenv/config"

const JWT_SECRET = process.env.JWT_SECRET || "jwtsecret01"

export const signToken = (userId: number) => {
   return jwt.sign(
      { userId },
      JWT_SECRET,
      { expiresIn: "1h" })
}

export const verifyToken = (token: string) => {
   return jwt.verify(token, JWT_SECRET) as { userId: number }
}