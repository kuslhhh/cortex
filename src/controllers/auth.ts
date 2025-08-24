import type { Request, Response } from "express"
import { signupSchema } from "../utils/validate"
import bcrypt from "bcryptjs"
import { prisma } from "../db"
import { Responses } from "../utils/types"
import { signToken } from "../utils/jwt"

export const signup = async (req: Request, res: Response) => {
   try {

      const parsed = signupSchema.safeParse(req.body)
      if (!parsed.success) {
         return res
            .status(Responses.BAD_REQUEST)
            .json({ error: parsed.error })
      }

      const { username, password } = parsed.data;
      const existingUser = await prisma.user.findUnique({ where: { username } })

      if (existingUser) {
         return res
            .status(Responses.FORBIDDEN)
            .json({ error: "User already exists" })
      }

      const hashed = await bcrypt.hash(password, 10);
      await prisma.user.create({
         data: {
            username,
            password: hashed
         }
      })

      res.status(Responses.SUCCESS).json({ message: "Signed Up" })
   } catch {
      res.status(Responses.INTERNAL_ERROR).json({ message: "Server Error" })
   }
}

export const signin = async (req: Request, res: Response) => {
   try {
      const { username, password } = req.body;

      const user = await prisma.user.findUnique({ where: { username } })
      if (!user) {
         return res.status(Responses.FORBIDDEN).json({ error: "Wrong email/password" })
      }

      const match = await bcrypt.compare(password, user.password)

      if (!match) {
         return res.status(Responses.FORBIDDEN).json({ error: "Wrong email/password" })
      }

      const token = signToken(user.id)

      res.json({ token })
   } catch {
      res.status(Responses.INTERNAL_ERROR).json({ error: "Internal server error" })
   }
}