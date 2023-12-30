import express from 'express'
import { z } from "zod"
import dotenv from "dotenv"
import authenticateJwt from '../middleware/auth'
import Profile from '../db/profile'
dotenv.config()

const router = express.Router()
const SECRET = process.env.JWT_SECRET


const userProfileCreateProps = z.object({
    username: z.string().max(30),
    bio: z.string().max(100),
    links: z.record(z.string().url()),
    avatar: z.string().url(),
    location: z.object({
        city: z.string().max(20),
        state: z.string().max(20),
        country: z.string().max(20),
    }),
})

const userProfileUpdateProps = z.object({
    username: z.string().max(30).optional(),
    bio: z.string().max(100).optional(),
    links: z.record(z.string().url()).optional(),
    avatar: z.string().url().optional(),
    location: z.object({
        city: z.string().max(20),
        state: z.string().max(20),
        country: z.string().max(20),
    }).optional(),
})



//Create User profile
router.post("/", authenticateJwt, async (req, res) => {

    const body = userProfileCreateProps.safeParse(req.body);
    if (!body.success) {
        return res.status(403).json({ msg: body.error })
    }
    const username = body.data.username
    const bio = body.data.bio
    const links = body.data.links
    const avatar = body.data.avatar
    const city = body.data.location.city
    const state = body.data.location.state
    const country = body.data.location.country
    const userId = req.headers["userId"];

    const existingProfile = await Profile.findOne({ userId });



    if (existingProfile) {
        return res.status(403).json({ msg: "Profile already exists" })
    }

    const newProfileData = {
        username: username,
        bio: bio,
        userId: userId,
        links: links,
        avatar: avatar,
        location: {
            city: city,
            state: state,
            country: country
        },
        followers: [],
        following: []
    }

    const newProfile = new Profile(newProfileData);
    await newProfile.save()



    res.status(200).json({
        msg: "Profile created Successfully"
    })
})

//GET CURRENT USER PROFILE
router.get("/", authenticateJwt, async (req, res) => {

    const userId = req.headers["userId"];
    const profile = await Profile.findOne({ userId });

    if (!profile) {
        return res.status(401).json({ msg: "Profile does not exists" })
    }

    res.status(200).json({
        profile: profile
    })
})

//GET PROFILE BY ID
router.get("/:profileId", authenticateJwt, async (req, res) => {

    const profileId = req.params.profileId;
    const profile = await Profile.findOne({ _id: profileId });

    if (!profile) {
        return res.status(401).json({ msg: "Profile does not exists" })
    }

    res.status(200).json({
        profile: profile
    })
})

// GET ALL PROFILES
router.get("/current/all", authenticateJwt, async (req, res) => {
    try {
        const profiles = await Profile.find({});

        if (!profiles) {
            return res.status(404).json({ msg: "No profiles found" });
        }

        res.status(200).json({
            profiles: profiles
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: "Internal server error" });
    }
});

//GET PROFILE BY USERNAME
router.get("/find/:username", authenticateJwt, async (req, res) => {
    const username = req.params.username;

    const profile = await Profile.findOne({ username });

    if (!profile) {
        return res.status(404).json({ msg: "Profile not found" });
    }

    res.status(200).json({
        profile: profile
    });
});

//UPDATE PROFILE
router.patch("/", authenticateJwt, async (req, res) => {

    const body = userProfileUpdateProps.safeParse(req.body);
    if (!body.success) {
        return res.status(401).json({ msg: body.error })
    }

    const updatedProfileData = body.data;
    const userId = req.headers["userId"];

    const response = await Profile.findOneAndUpdate({ userId }, updatedProfileData)

    if (!response) {
        res.status(500).json({ msg: "Internal server error" })
    }

    res.status(200).json({ msg: "Profile updated successfully" })

})


export default router