import type { NextFunction, Request, Response } from "express";
import { prisma } from "../../db.js";
import { AppError } from "../../middleware/errorHandler.js";
import { Responses } from "../../types/types.js";

export const addContent = async (req: Request, res: Response, next: NextFunction) => {
   try {
      const { type, link, title, description, tags } = req.body;

      console.log(req.body);

      if (!["document", "tweet", "youtube", "link"].includes(type)) {
         next(new AppError("Invalid content type", Responses.FORBIDDEN))
      }

      const content = await prisma.content.create({
         data: {
            type,
            link,
            title,
            description,
            userId: req.user!.id,
            tags: {
               connectOrCreate: tags.map((tag: string) => ({
                  where: { title: tag },
                  create: { title: tag },
               })),
            },
         },
         include: { tags: true },
      });

      res.json(content);
   } catch (err) {
      next(err)
   }
}
