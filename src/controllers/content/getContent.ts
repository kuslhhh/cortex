import type { NextFunction, Request, Response } from "express"
import { prisma } from "../../db"

export const getContent = async (req: Request, res: Response, next: NextFunction) => {
   try {
      const userId = (req as any).userId;
      const { type, tags, search, page = "1", limit = "6" } = req.query;

      const pageNum = parseInt(page as string, 10);
      const limitNum = parseInt(limit as string, 10);
      const skip = (pageNum - 1) * limitNum;

      const filters: any = { userId };

      if (type) filters.type = type;

      if (tags) {
         const tagList = (tags as string).split(",").map(t => t.trim());
         filters.tags = {
            some: {
               title: { in: tagList }
            }
         };
      }

      if (search) {
         filters.OR = [
            { title: { contains: search as string, mode: "insensitive" } },
            { description: { contains: search as string, mode: "insensitive" }}
         ]
      }

      const [items, total] = await Promise.all([
         prisma.content.findMany({
            where: filters,
            skip,
            take: limitNum,
            include: { tags: true },
            orderBy: { createdAt: "desc" },
         }),
         prisma.content.count({ where: filters }),
      ]);

      res.json({
         page: pageNum,
         limit: limitNum,
         total,
         totalPages: Math.ceil(total / limitNum),
         items,
      });
   } catch (err) {
      next(err);
   }
};