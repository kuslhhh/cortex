import type { Request, Response, NextFunction } from "express"
import { AppError } from "./errorHandler";
import { Responses } from "../types/types";
import { verifyToken } from "../utils/jwt";

export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
   const token = req.cookies.token;

   if (!token) {
      return next(new AppError("Unauthorized: No tocken provided", Responses.UNAUTHORIZED))
   }

   try {
      const decoded = verifyToken(token);
      
      (req as any).user = {id: decoded.userId};
      next()
   } catch {
      next(new AppError("Unauthorized: Invalid token", Responses.UNAUTHORIZED))
   }
}