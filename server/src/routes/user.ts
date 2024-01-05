import express from 'express'
import { Schema, z } from "zod"
import dotenv from "dotenv"
import authenticateJwt from '../middleware/auth'
import Profile from '../db/profile'
import User from '../db/user'
dotenv.config()

const router = express.Router()

const userUpdateProps = z.object({
    password: z.string().min(7)
})

//Follow other user
router.post("/follow/:profileId", authenticateJwt, async (req, res) => {

    const profileId = req.params.profileId;
    const currentUserId = req.headers["userId"]

    const currentProfile = await Profile.findOneAndUpdate(
        { userId: currentUserId, following: { $nin: profileId } },
        { $push: { following: profileId } },
        { new: true }
    );

    if (!currentProfile) {
        return res.status(404).json({ msg: "Current user not found" });
    }

    const profileToFollow = await Profile.findOneAndUpdate(
        { _id: profileId, followers: { $ne: currentProfile._id } },
        { $push: { followers: currentProfile._id } },
        { new: true }
    );

    if (!profileToFollow) {
        return res.status(404).json({ msg: "User to follow not found" });
    }

    res.status(200).json({ msg: "Successfully followed user" });

})

// Unfollow user
router.post("/unfollow/:profileId", authenticateJwt, async (req, res) => {
    try {
        const profileId = req.params.profileId;
        const currentUserId = req.headers["userId"];

        const currentProfile = await Profile.findOneAndUpdate(
            { userId: currentUserId, following: profileId },
            { $pull: { following: profileId } },
            { new: true }
        );

        if (!currentProfile) {
            return res.status(404).json({ msg: "Current user not found or not following the specified user" });
        }

        const profileToUnfollow = await Profile.findOneAndUpdate(
            { _id: profileId, followers: currentProfile._id },
            { $pull: { followers: currentProfile._id } },
            { new: true }
        );

        if (!profileToUnfollow) {
            return res.status(404).json({ msg: "User to unfollow not found or not being followed by the current user" });
        }

        res.status(200).json({ msg: "Successfully unfollowed user" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: "Internal server error" });
    }
});

// Get All Followers
router.get("/followers", authenticateJwt, async (req, res) => {
    try {
        const currentUserId = req.headers["userId"];

        const currentUser = await Profile.findOne({ _id: currentUserId }).populate("followers", "_id username");

        if (!currentUser) {
            return res.status(404).json({ msg: "Current user not found" });
        }

        res.status(200).json({ followers: currentUser.followers });
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: "Internal server error" });
    }
});
router.get("/followers/:profileId", authenticateJwt, async (req, res) => {
    try {
        const profileId = req.params.profileId

        const profile = await Profile.findOne({ _id: profileId }).populate("followers", "_id username bio");

        if (!profile) {
            return res.status(404).json({ msg: "Current user not found" });
        }

        res.status(200).json({ followers: profile.followers });
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: "Internal server error" });
    }
});

// Get All Following
router.get("/following", authenticateJwt, async (req, res) => {
    try {
        const currentUserId = req.headers["userId"];

        const currentUser = await Profile.findOne({ _id: currentUserId }).populate("following", "_id username");

        if (!currentUser) {
            return res.status(404).json({ msg: "Current user not found" });
        }

        res.status(200).json({ following: currentUser.following });
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: "Internal server error" });
    }
});

router.get("/following/:profileId", authenticateJwt, async (req, res) => {
    try {
        const profileId = req.params.profileId

        const profile = await Profile.findOne({ _id: profileId }).populate("following", "_id username bio");

        if (!profile) {
            return res.status(404).json({ msg: "Current user not found" });
        }

        res.status(200).json({ following: profile.following });
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: "Internal server error" });
    }
});

router.get("/me", authenticateJwt, async(req,res) => {
    try{
        const userId = req.headers["userId"];

        const userData = await User.findOne({_id:userId});

        if(!userData){
            return res.status(404).json({msg: "User not found"})
        }

        res.status(200).json({msg:"User data Successfully", data: userData})
    }catch(err) {
        console.log(err)
        res.status(500).json({ msg: "Internal server error" });
    }
})

router.patch("/update/password", authenticateJwt ,async (req, res) => {
    try{

        const body = userUpdateProps.safeParse(req.body)
        if(!body.success){
            return res.status(403).json({msg: body.error})
        }
        const userId = req.headers["userId"];
        const userData = await User.findOneAndUpdate({_id:userId}, {password: body.data.password}, {new: true});

        if(!userData){
            return res.status(404).json({msg: "User not found"})
        }

        res.status(200).json({msg:"User Updated Successfully", data: userData})
    }catch(err) {
        console.log(err)
        res.status(500).json({ msg: "Internal server error" });
    }
})

export default router