import { Router } from "express"
import { authMiddleware } from "../middleware/auth"
import { addContent } from "../controllers/content/addContent";
import { getContent } from "../controllers/content/getContent";
import { deleteContent } from "../controllers/content/deleteContent";
import { updateContent } from "../controllers/content/updateContent";
import { validate } from "../middleware/validate";
import { addContentSchema, updateContentSchema } from "../utils/validate";

const router = Router()

router.post("/", validate(addContentSchema), authMiddleware, addContent)
router.get("/", authMiddleware, getContent)
router.delete("/:id", authMiddleware, deleteContent)
router.put("/:id", validate(updateContentSchema), authMiddleware, updateContent)

export default router;