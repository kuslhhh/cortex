import express, { Request, Response } from 'express'
import { userMiddleware } from '../middleware'
import { ContentModel } from '../models/content';

const router = express.Router()

router.post("/content", userMiddleware, async (req: Request, res: Response) => {
    const { link, type } = req.body;

    try {
        await ContentModel.create({
            link,
            type,
            // @ts-ignore
            userId: req.userId,
            tags: []
        });

        res.status(201).json({ message: "Content added" });
    } catch (error) {
        console.error("Error adding content:", error);
        res.status(500).json({ message: "Error adding content", error });
    }
});

export default router