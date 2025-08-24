import express from "express"
import authRoutes from "./routes/auth"
import contentRoutes from "./routes/content"
import "dotenv/config"

const app = express()

app.use(express.json())

app.use("/api/v1", authRoutes)
// app.use("/api/v1/contents", contentRoutes)

const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
   console.log(`Server running on port http://localhost:${PORT}`);
})
