import type { NextFunction, Request, Response } from "express"
import { prisma } from "../../db";
import { AppError } from "../../middleware/errorHandler";
import { Responses } from "../../types/types";

export const updateContent = async (req: Request, res: Response, next: NextFunction) => {

   try {
      const { id } = req.params;
      const userId = (req as any).userId;
      const { title,description, tags } = req.body;

      const content = await prisma.content.findFirst({
         where: { id: Number(id), userId }
      });

      if (!content) return next(new AppError("Content not found or not owned by user", Responses.BAD_REQUEST))

      const updated = await prisma.content.update({
         where: { id: content.id },
         data: {
            title,
            description,
            tags
         }
      });

      res.status(Responses.SUCCESS).json(updated)
   } catch (err) {
      next(err)
   }

}