import 'dotenv/config';
import { Request, Response} from 'express'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { z } from "zod"

const signUpSchema = z.object({
    username: z.string().min(3, 'Username must be atleast 3 characters long'),
    password: z.string().min(8, 'Username must be atleast 8 characters long').regex(new RegExp('(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*#?&])[A-Za-z\\d@$!%*#?&]{8,}'), 'Password must contain at least one lowercase, uppercase letter, number, and special character')
})

const salts = 10;
const jwtSecret = process.env.JWT_SECRET;

export const signUpHandler = async (req: Request, res: Response) => {
    try{
        const validationResult =signUpSchema.safeParse(req.body);

        if(!validationResult.success) {
            return res.status(400).json({
                message: "validation failed",
                error: validationResult.error.errors
            })
        } 
    } catch {
        
    }
}
