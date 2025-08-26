import { Router } from "express";
import { authMiddleware } from "../middleware/auth";
import { toggleShare } from "../controllers/share/toggleShare";
import { getShare } from "../controllers/share/getShare";

const router = Router()

router.post("/", authMiddleware, toggleShare)
router.get("/:shareLink", getShare)

export default router;