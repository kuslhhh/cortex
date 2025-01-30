import express, { Request, Response } from 'express'
import { userMiddleware } from '../middleware'

const router = express.Router()

router.post("/content", userMiddleware, (req: Request, res: Response) => {
   

})