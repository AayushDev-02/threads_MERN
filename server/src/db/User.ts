import mongoose from "mongoose"

const userSchema = new mongoose.Schema({
    
    email: String,
    password: String,
    
})

 const User = mongoose.model("User", userSchema)

 export default User