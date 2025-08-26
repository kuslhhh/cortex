import z from "zod";

const strongPassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

export const signupSchema = z.object({
   username: z.string().min(3).max(20),
   password: z.string().regex(strongPassword)
})

export const signinSchema = z.object({
   username: z.string().min(3).max(20),
   password: z.string().regex(strongPassword)
})

export const addContentSchema = z.object({
   type: z.enum(["document", "tweet", "youtube", "link"]),
   link: z.url(),
   title: z.string().min(1, "Title is requires"),
   description: z.string().optional(),
   tags: z.array(z.string()).optional()
})

export const updateContentSchema = z.object({
   title: z.string().min(1).optional(),
   description: z.string().optional(),
   link: z.string().url().optional(),
   tags: z.array(z.string()).optional()
})