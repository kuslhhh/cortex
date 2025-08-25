import type { NextFunction, Request, Response } from "express"
import { prisma } from "../../db"

export const getContent = async (req: Request, res: Response, next: NextFunction) => {
   try {
      const { type, tags } = req.query;

      const filters: any = { userId: (req as any).userId }

      if (type) filters.type = type;

      if (tags) {
         const tagList = (tags as string).split(",").map(t => t.trim());
         filters.tags = {
            some: {
               title: { in: tagList }
            }
         };
      }

      const contents = await prisma.content.findMany({
         where: filters,
         include: { tags: true }
      })

      res.json(contents)
   } catch (err) {
      next(err)
   }
}