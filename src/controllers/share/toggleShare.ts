import type { NextFunction, Request, Response } from "express"
import { AppError } from "../../middleware/errorHandler";
import { Responses } from "../../types/types";
import crypto from "crypto"
import { prisma } from "../../db";

export const toggleShare = async (req: Request, res: Response, next: NextFunction) => {
   try {
      const user = (req as any).user;

      if (!user || !user.id) {
         return next(new AppError("No userId", 411))
      }
      const userId = user.id
      const { share } = req.body;
      if (typeof share !== "boolean") {
         return next(new AppError("Invalid input", Responses.BAD_REQUEST))
      }

      let userShare = await prisma.share.findUnique({
         where: { userId }
      })

      if (!userShare) {
         const hash = crypto.randomBytes(16).toString("hex");
         userShare = await prisma.share.create({
            data: { userId, hash, enabled: share }
         })
      } else {
         userShare = await prisma.share.update({
            where: { userId },
            data: { enabled: share }
         })
      }

      const link = `${req.protocol}://${req.get("host")}/api/v1/share/${userShare.hash}`

      res.json({ link })
   } catch (err) {
      next(err)
   }
}