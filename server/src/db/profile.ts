import mongoose, { Document } from "mongoose";

interface ProfileDocument extends Document {
    userId: mongoose.Schema.Types.ObjectId;
    username: string;
    bio: string;
    links: Map<string, string>;
    avatar: string;
    location: {
        city: string;
        state: string;
        country: string;
    };
    followers: mongoose.Schema.Types.ObjectId[];
    following: mongoose.Schema.Types.ObjectId[];
    followersCount: number;
    followingCount: number;
}

const profileSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", unique: true },
    username: { type: String, unique: true },
    bio: String,
    links: {
        type: Map,
        of: String,
    },
    avatar: String,
    location: {
        city: String,
        state: String,
        country: String,
    },
    followers: [{ type: mongoose.Schema.Types.ObjectId, ref: "Profile" }],
    following: [{ type: mongoose.Schema.Types.ObjectId, ref: "Profile" }],
});

profileSchema.virtual("followersCount").get(function (this: ProfileDocument) {
    return this.following ? this.followers.length : 0;
});

profileSchema.virtual("followingCount").get(function (this: ProfileDocument) {
    return this.following ? this.following.length : 0;
});

profileSchema.set("toJSON", { virtuals: true });

const Profile = mongoose.model<ProfileDocument>("Profile", profileSchema);

export default Profile;
