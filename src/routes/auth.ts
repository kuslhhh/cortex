import express, { Request, Response } from "express";
import { UserModel } from "../models/user";
import bcrypt from 'bcrypt'
import jsonwebtoken from 'jsonwebtoken'
import { JWT_PASS } from "../config";

const router = express.Router()

router.post("/signup", async (req: Request, res: Response) => {
    const { username, email, password } = req.body;

    try {

        const hashedPassword = await bcrypt.hash(password, 10)
        const newUser = new UserModel({ username, email, password: hashedPassword })

        await newUser.save()
        res.status(201).json({ message: "User created successfully" })
    } catch (error) {
        res.status(400).json({ error: "Error creating user", details: error })
    }
});

router.post("/signin", async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await UserModel.findOne({ email });
        if (!user) return res.status(404).json({ error: "User not found" });

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) return res.status(401).json({ error: "Invalid credentials" });

        const token = jsonwebtoken.sign(
            { userId: user._id },
            JWT_PASS || "secretKey",
            { expiresIn: "1h" }
        );

        res.status(200).json({ message: "Signin successful", token });
    } catch (error) {
        res.status(500).json({ error: "Error signing in", details: error });
    }
});

export default router;