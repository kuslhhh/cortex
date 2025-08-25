import { Router } from "express"
import { signup } from "../controllers/auth/signup";
import { signin } from "../controllers/auth/signin";
import { validate } from "../middleware/validate";
import { signinSchema, signupSchema } from "../utils/validate";
import { authMiddleware } from "../middleware/auth";
import { signout } from "../controllers/auth/signout";

const router = Router();

router.post("/signup", validate(signupSchema), signup);
router.post("/signin", validate(signinSchema), signin);
router.get("/me", authMiddleware, (req, res) => {
   res.send("authenticated route")
})
router.get("/signout", signout)

export default router;