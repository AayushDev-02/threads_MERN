import express from 'express'
import {z} from "zod"
import  User  from '../db/user'
import jwt from "jsonwebtoken"
import dotenv from "dotenv"
dotenv.config()

const router = express.Router()
const SECRET = process.env.JWT_SECRET

const userSignUpProps = z.object({
    username : z.string().min(5).max(10),
    email : z.string().email(),
    password: z.string().min(7)
})

const userSignInProps = z.object({
    username: z.string().min(5).max(10).optional(),
    email : z.string().email().optional(),
    password: z.string().min(7)
})


router.post("/signup",  async (req,res) => {
    
    const body = userSignUpProps.safeParse(req.body);    
    if(!body.success){
        return res.status(403).json({msg: body.error})
    }

    const username = body.data.username
    const password = body.data.password
    const email = body.data.email
    
    const user =  await User.findOne({ $or: [{ username }, { email }] });

    if(user) {
        return res.status(403).json({msg: "User already exists"})
    }

    const newUserData = {
        username : username,
        email: email,
        password: password
    }

    const newUser = new User(newUserData);
    await newUser.save()
    
    if (!SECRET) {
        console.error('JWT secret is not defined.');
        return res.status(500).json({ msg: 'Internal Server Error' });
      }
  

    const token = jwt.sign({_id : newUser._id}, SECRET, {expiresIn: "1h"});
    

    res.status(200).json({
        msg:"User created Successfully",
        token : token
    })
})

router.post("/login" , async(req, res) => {
    const body = userSignInProps.safeParse(req.body);    
    if(!body.success){
        return res.status(403).json({msg: body.error})
    }
    let username , password , email;
    let user;
    if(body.data.username) {
        username = body.data.username
        password = body.data.password

        user = await User.findOne({username, password})
        
    }else {
        email = body.data.email
        password = body.data.password

        user = await User.findOne({email, password})
    }
    
    // const user =  await User.findOne({ $or: [{ username }, { email }] });

    if(!user) {
        return res.status(403).json({msg: "User does not exist"})
    }

    if (!SECRET) {
        console.error('JWT secret is not defined.');
        return res.status(500).json({ msg: 'Internal Server Error' });
      }
  

    const token = jwt.sign({_id : user._id}, SECRET, {expiresIn: "1h"});
    req.headers = {
        authorization : `Bearer ${token}`
    }

    res.status(200).json({
        msg:"Login Successfully",
        token : token
    })
})


export default router