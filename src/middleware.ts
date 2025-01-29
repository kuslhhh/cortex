import { Response, Request, NextFunction } from "express"
import jwt from "jsonwebtoken"
import 'dotenv/config'

const JWT_PASS = process.env.SECRET

declare module 'express' {
    interface Request {
        userId?: string
    }
}

export const userMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const header = req.headers["authorization"];
    const decoded = jwt.verify(header as string, JWT_PASS || "") as jwt.JwtPayload

    try {

        if (decoded && decoded.id) {
            req.userId = decoded.id
        }

        next();
    } catch (error) {
        return res.status(401).json({ message: "Invalid or expired token" })
    }


}