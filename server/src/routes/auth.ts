import express from 'express'
import {z} from "zod"
import  User  from '../db/user'
import jwt from "jsonwebtoken"
import dotenv from "dotenv"
dotenv.config()

const router = express.Router()
const SECRET = process.env.JWT_SECRET

const userSignUpProps = z.object({
    email : z.string().email(),
    password: z.string().min(7)
})

const userSignInProps = z.object({
    email : z.string().email().optional(),
    password: z.string().min(7)
})


router.post("/signup",  async (req,res) => {
    
    const body = userSignUpProps.safeParse(req.body);    
    if(!body.success){
        return res.status(403).json({msg: body.error})
    }

    const password = body.data.password
    const email = body.data.email
    
    const user =  await User.findOne({email});

    if(user) {
        return res.status(403).json({msg: "User already exists"})
    }

    const newUserData = {
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
        token : token,
        user: newUser
    })
})

router.post("/login" , async(req, res) => {
    const body = userSignInProps.safeParse(req.body);    
    if(!body.success){
        return res.status(403).json({msg: body.error})
    }
    
        const email = body.data.email
        const password = body.data.password

        const user = await User.findOne({email, password})
    

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
        token : token,
        user: user
    })
})


export default router