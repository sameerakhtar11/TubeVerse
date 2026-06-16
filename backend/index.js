import express from "express"
import dotenv from "dotenv"
import connectDB from "./config/db.js"
import authRouter from "./routes/authRouter.js"
import cookieParser from "cookie-parser"
import cors from "cors"
import userRouter from "./routes/userRouter.js"
dotenv.config()

const port = process.env.PORT
const app = express()
app.use(cookieParser())
app.use(express.json())

app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}))
app.use("/api/auth", authRouter);
app.use("/api/user", userRouter);

app.listen(port, () => {
    console.log("Server is listing")
    connectDB()
})