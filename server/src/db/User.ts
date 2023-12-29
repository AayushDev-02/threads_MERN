import mongoose from "mongoose"

const userSchema = new mongoose.Schema({
    username: {type: String , unique: true} ,
    email: String,
    password: String,
    followers : [{type: mongoose.Schema.Types.ObjectId, ref: "User"}],
    following : [{type: mongoose.Schema.Types.ObjectId, ref: "User"}]
})

 const User = mongoose.model("User", userSchema)

 export default User