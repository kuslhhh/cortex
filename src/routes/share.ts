import express, { Request, Response } from "express";
import { userMiddleware } from "../middleware";
import { ContentModel } from "../models/content";
import { linkModel } from "../models/links";
import { random } from "../utils";
import { UserModel } from "../models/user";

const router = express.Router();

router.post("/share", userMiddleware, async (req: Request, res: Response) => {
    try {
        const share = req.body.share;

        if (share) {
            const hash = random(10);

            const exitstingLink = await linkModel.findOne({
                //@ts-ignore
                userId: req.userId,
            });

            if (exitstingLink) {
                res.json({
                    hash: exitstingLink.hash,
                });
                return;
            }

            await linkModel.create({
                //@ts-ignore
                userId: req.userId,
                hash: hash,
            });

            res.json({
                message: "/share/" + hash,
            });
        } else {
            await linkModel.deleteOne({
                //@ts-ignore
                userId: req.userId,
            });

            res.json({
                message: "removed link",
            });
        }
    } catch (error) {
        res.status(403).json("Something wrong");
    }
});

router.get(
    "/:shareLink",
    userMiddleware,
    async (req: Request, res: Response) => {
        try {
            const hash = req.params.shareLink;

            const link = await linkModel.findOne({
                hash,
            });

            if (!link) {
                res.status(411).json({
                    message: "Incorrect Input",
                });
                return;
            }
            const content = await ContentModel.find({
                userId: link.userId,
            });

            const user = await UserModel.findOne({
                _id: link.userId,
            });

            if (!user) {
                res.status(411).json({
                    message: "User not found",
                });
                return;
            }

            res.json({
                username: user?.username,
                content: content,
            });
        } catch (error) {
            res.status(403).json("Something wrong");
        }
    }
);

export default router;
