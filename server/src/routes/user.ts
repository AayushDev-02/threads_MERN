import express from 'express'
import { Schema, z } from "zod"
import dotenv from "dotenv"
import authenticateJwt from '../middleware/auth'
import Profile from '../db/profile'
import User from '../db/user'
dotenv.config()

const router = express.Router()

//Follow other user
router.post("/follow/:userId", authenticateJwt, async (req, res) => {

    const userId = req.params.userId;
    const currentUserId = req.headers["userId"]

    const currentUser = await Profile.findOneAndUpdate(
        { userId: currentUserId, following: { $ne: userId } },
        { $push: { following: userId } },
        { new: true }
    );

    if (!currentUser) {
        return res.status(404).json({ msg: "Current user not found" });
    }

    const userToFollow = await Profile.findOneAndUpdate(
        { userId: userId, followers: { $ne: currentUserId } },
        { $push: { followers: currentUserId } },
        { new: true }
    );

    if (!userToFollow) {
        return res.status(404).json({ msg: "User to follow not found" });
    }

    res.status(200).json({ msg: "Successfully followed user" });

})

//Unfollow other user
router.post("/unfollow/:userId", authenticateJwt, async (req, res) => {

    const userId = req.params.userId;
    const currentUserId = req.headers["userId"];

    
    const currentUser = await Profile.findOneAndUpdate(
        { userId: currentUserId, following: userId }, 
        { $pull: { following: userId } },
        { new: true } 
    );

    if (!currentUser) {
        return res.status(404).json({ msg: "Current user not found or not following the user" });
    }

    const userToUnfollow = await Profile.findOneAndUpdate(
        { userId: userId, followers: currentUserId },
        { $pull: { followers: currentUserId } },
        { new: true } 
    );
    if (!userToUnfollow) {
        return res.status(404).json({ msg: "User to unfollow not found or not being followed" });
    }

    res.status(200).json({ msg: "Successfully unfollowed user" });

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


export default router