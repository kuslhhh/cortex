import { createUser, getUserByEmail } from "db/users";
import express, { Request, Response } from "express"
import { authentication, random } from "helpers";

export const register = async (req: Request, res: Response) => {
    try {

        const { email, password, username } = req.body;

        if (!email || !password || !username) return res.sendStatus(400)

        const exitingUser = await getUserByEmail(email)

        if (exitingUser) return res.sendStatus(400)

        const salt = random()

        const user = await createUser({
            email,
            username,
            authentication: {
                salt,
                password: authentication(salt, password)
            }
        })

        return res.status(200).json(user).end()

    } catch (error) {
        console.log(error);
        return res.sendStatus(400)

    }
}