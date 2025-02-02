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


router.get("/content", userMiddleware, async (req: Request, res: Response) => {

    try {
        // @ts-ignore
        const userId = req.userId;
        const content = await ContentModel.find({
            userId: userId
        }).populate("userId", "username")
        res.json({
            content
        })


    } catch (error) {
        console.error("Error getting content:", error);
        res.status(500).json({ message: "Error getting content", error });
    }
});

router.delete("/content", userMiddleware, async (req: Request, res: Response) => {

    try {

        const contentId = req.body.contentId;

        await ContentModel.deleteMany({
            contentId,
            // @ts-ignore
            userId: req.userId
        })
        res.json({
            message: "Deleted Content"
        })

    } catch (error) {
        console.error("Error getting content:", error);
        res.status(500).json({ message: "Error getting content", error });
    }
});

export default router;