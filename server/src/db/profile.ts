import mongoose from "mongoose";

const profileSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", unique: true },
    bio: String,
    links: {
        type: Map,
        of: String
    },
    avatar: String,
    location: {
        city: String,
        state: String,
        country: String,
    }
})

const Profile = mongoose.model("Profile", profileSchema)

export default Profile