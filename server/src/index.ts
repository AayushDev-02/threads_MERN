import express from 'express'
import mongoose from "mongoose"
import cors from 'cors'
import dotenv from "dotenv"
import authRouter from './routes/auth'
dotenv.config()
const port = process.env.PORT;


const app = express();

app.use(express.json())
app.use(cors())


app.use("/auth", authRouter)

mongoose.connect(process.env.MONGO_URI || "", {dbName: "threads"})

app.listen(port, () => {
    console.log("Server running on port : " , port)
})