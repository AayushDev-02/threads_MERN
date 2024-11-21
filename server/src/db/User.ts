import mongoose from "mongoose"


interface IUser extends Document {
    email: string;
    password: string;
}


const userSchema = new mongoose.Schema<IUser>({
    
    email: String,
    password: String,
    
})

 const User = mongoose.model("User", userSchema)

 export default User