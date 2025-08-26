import type { NextFunction, Request, Response } from "express";
import { prisma } from "../../db";
import { Responses } from "../../types/types";
import { AppError } from "../../middleware/errorHandler";

export const deleteContent = async (req: Request, res: Response, next: NextFunction) => {
   try {
      const { id } = req.params;
      const userId = (req as any).userId;

      const content = await prisma.content.findFirst({
         where: { id: Number(id), userId }
      });

      if (!content) {
         next(new AppError("Content not found", Responses.FORBIDDEN))
      }

      const deleted = await prisma.content.delete({
         where: { id: Number(id) },
         include: { tags: true }
      });
      res.json(deleted)
   } catch (err) {
      next(err)
   }
}