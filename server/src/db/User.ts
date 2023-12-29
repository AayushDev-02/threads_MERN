import mongoose from "mongoose"

const userSchema = new mongoose.Schema({
    username: {type: String , unique: true} ,
    email: String,
    password: String
})

export const User = mongoose.model("User", userSchema)