import express from 'express'
import authRoutes from './routes/auth'
import contentRoutes from './routes/content'
import mongoose from 'mongoose'
import 'dotenv/config'

const app = express()
app.use(express.json())

mongoose
    .connect(process.env.MONGODB_URL || "")
    .then(() => console.log("connected to mongodb"))
    .catch((error) => console.log("mongodb connection error", error));

app.use("/api/v1/auth", authRoutes)
app.use("/api/v1", contentRoutes)

const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
})
