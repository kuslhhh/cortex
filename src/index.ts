import express from "express"
import http from "http"
import bodyParser from "body-parser"
import cookieParser from "cookie-parser"
import compression from 'compression'
import cors from "cors"
import 'dotenv/config'
import mongoose from "mongoose"
import { error } from "console"

const app = express()

app.use(cors({
    credentials: true
}))

app.use(compression())
app.use(cookieParser())
app.use(bodyParser.json())

const server = http.createServer(app)

server.listen(3000, () => {
    console.log('Server running on server http://localhost:3000');
})

const mongo = process.env.MONGODB_URL

mongoose.Promise = Promise
mongoose.connect(mongo)
mongoose.connection.on('error', (error: Error) => console.log(error))



