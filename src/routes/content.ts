import {Router} from "express"
import { authMiddleware } from "../middleware/auth"
import { addContent } from "../controllers/content/addContent";
import { getContent } from "../controllers/content/getContent";
import { deleteContent } from "../controllers/content/deleteContent";
import { updateContent } from "../controllers/content/updateContent";

const router = Router()

router.post("/", authMiddleware, addContent )
router.get("/", authMiddleware, getContent )
router.delete("/:id", authMiddleware, deleteContent )
router.put("/:id", authMiddleware, updateContent )

export default router;