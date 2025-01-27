import express from "express"

import jsonwebtoken from "jsonwebtoken"
import { UserModel } from "./db/model";

const app = express();

app.post("/api/v1/signup")

app.post("/api/v1/signin" )

app.post("/api/v1/content" )

app.get("/api/v1/content" )

app.delete("/api/v1/content" )

app.post("api/v1/cortex/share" )

app.get("api/v1/cortex/:shareLink" )
