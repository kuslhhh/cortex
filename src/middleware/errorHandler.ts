import type { Request, Response, NextFunction } from "express"
import { Responses } from "../types/types";

export class AppError extends Error {
   statusCode: number;
   constructor(message: string, statusCode: number) {
      super(message)
      this.statusCode = statusCode;
   }
}

export const errorHandler = (
   err: Error | AppError,
   req: Request,
   res: Response,
   next: NextFunction
) => {
   console.error("Error"+ err.message)

   if(err instanceof AppError ) {
      return res.status(err.statusCode).json({
         success: false,
         message: err.message
      })
   }
   
   res.status(Responses.INTERNAL_ERROR).json({
      success : false,
      message : "Internal Server Error"
   })
}

