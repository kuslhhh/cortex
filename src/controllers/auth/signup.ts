import type { NextFunction, Request, Response } from "express"
import bcrypt from "bcryptjs"
import { prisma } from "../../db"
import { Responses } from "../../types/types"
import { AppError } from "../../middleware/errorHandler"

export const signup = async (req: Request, res: Response, next: NextFunction) => {
   try {


      const { username, password } = req.body;
      const existingUser = await prisma.user.findUnique({ where: { username } })

      if (existingUser) {
         throw new AppError("User already exists", Responses.FORBIDDEN)
      }

      const hashed = await bcrypt.hash(password, 10);
      await prisma.user.create({
         data: {
            username,
            password: hashed
         }
      })

      res.status(Responses.SUCCESS).json({ message: "Signed Up" })
   } catch (err) {
      next(err)
   }
}