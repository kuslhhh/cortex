import type { NextFunction, Request, Response } from "express"
import { prisma } from "../../db";
import { AppError } from "../../middleware/errorHandler";
import { Responses } from "../../types/types";

export const getShare = async (req: Request, res: Response, next: NextFunction) => {
   try {
      const { shareLink } = req.params;

      const share = await prisma.share.findUnique({
         where: { hash: shareLink },
         include: { user: true }
      })

      if (!share || !share.enabled) {
         return next(new AppError("Share link Invalid or disabled", Responses.BAD_REQUEST))
      }

      const contents = await prisma.content.findMany({
         where: { userId: share.userId },
         include: { tags: true }
      })

      res.json({
         username: share.user.username,
         contents: contents.map(c => ({
            id: c.id,
            type: c.type,
            link: c.link,
            title: c.title,
            description: c.description,
            tags: c.tags.map(t => t.title)
         }))
      })
   } catch (err) {
      next(err)
   }
}