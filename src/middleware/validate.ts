import type { Request, Response, NextFunction } from "express"
import type { ZodSchema } from "zod"
import { AppError } from "./errorHandler"

export const validate = (schema: ZodSchema) => {
   return (req: Request, res: Response, next: NextFunction) => {
      const parsed = schema.safeParse(req.body)
      if (!parsed.success) {
         const errorMessage = parsed.error.issues.map(e => e.message).join(", ")
         return next(new AppError(errorMessage, 411))
      }
      req.body = parsed.data;
      next()
   }
}