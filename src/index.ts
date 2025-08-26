import express from "express"
import authRoutes from "./routes/auth"
import contentRoutes from "./routes/content"
import shareRoutes from "./routes/share"
import "dotenv/config"
import { errorHandler } from "./middleware/errorHandler"
import cookieParser from "cookie-parser"

const app = express()

app.use(express.json())
app.use(cookieParser())

app.use("/api/v1", authRoutes)
app.use("/api/v1/contents", contentRoutes)
app.use("/api/v1/share", shareRoutes )

const PORT = process.env.PORT || 3000

app.use(errorHandler)
app.listen(PORT, () => {
   console.log(`Server running on port http://localhost:${PORT}`);
})
