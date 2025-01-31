import express, { Request, Response } from 'express'
import { userMiddleware } from '../middleware'
import { ContentModel } from '../models/content';

const router = express.Router()

router.post("/content", userMiddleware, (req: Request, res: Response) => {

    const link = req.body.link;
    const type = req.body.type;

    ContentModel.create({
        link,
        type,
        userId: req.userId,
        tag: []
    })

    res.json("Content added")
})

export default router