import type { NextFunction, Request, Response } from "express"
import bcrypt from "bcryptjs"
import { prisma } from "../../db"
import { Responses } from "../../types/types"
import { signToken } from "../../utils/jwt"
import { AppError } from "../../middleware/errorHandler"

export const signin = async (req: Request, res: Response, next: NextFunction) => {
   try {
      const { username, password } = req.body;

      const user = await prisma.user.findUnique({ where: { username } })
      if (!user) {
         throw new AppError("Invalid inputs", Responses.UNAUTHORIZED)
      }

      const match = await bcrypt.compare(password, user.password)

      if (!match) {
         throw new AppError("User already exists", Responses.FORBIDDEN)
      }

      const token = signToken(user.id)

      res.cookie("token", token, {
         httpOnly: true,
         secure: false,
         sameSite: "lax",
         maxAge: 1000 * 60 * 60
      })

      res.json({
         message: "Signed in"
      })
   } catch (err) {
      next(err)
   }
}