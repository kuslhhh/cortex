import type{Request, Response} from "express"

export const signout =  (req:Request, res: Response) => {
   res.clearCookie("token", {
      httpOnly: true,
      secure: false,
      sameSite: "lax"
   })

   res.json({message: "Signed out"})
}