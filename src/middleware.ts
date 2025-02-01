import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { JWT_PASS } from "./config"; 

interface AuthRequest extends Request {
    userId?: string;
}

export const userMiddleware = (req: AuthRequest, res: Response, next: NextFunction) => {
    const authHeader = req.headers["authorization"];

    if (!authHeader) {
        return res.status(401).json({ message: "Authorization token missing" });
    }

    const token = authHeader.startsWith("Bearer ") ? authHeader.split(" ")[1] : authHeader;

    try {
        const decoded = jwt.verify(token, JWT_PASS) as { userId: string };

        if (!decoded?.userId) {
            return res.status(403).json({ message: "Invalid token" });
        }

        req.userId = decoded.userId; 
        next();
    } catch (error) {
        console.error("JWT verification error:", error);
        return res.status(403).json({ message: "Invalid token" });
    }
};
