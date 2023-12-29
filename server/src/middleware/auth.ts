import { NextFunction, Request, Response } from 'express'
import jwt from 'jsonwebtoken'

const SECRET = process.env.JWT_SECRET
console.log(SECRET)
const authenticateJwt = (req: Request, res: Response, next: NextFunction) => {

    if (!SECRET) {
        console.error('JWT secret is not defined.');
        return res.status(500).json({
            msg: 'Internal Server Error',
        });
    }

    const authHeaders = req.headers.authorization;
    if(authHeaders){

        const token =  authHeaders.split(" ")[1]
        
        jwt.verify(token, SECRET, (err, payload) => {
            if(err){
                return res.status(403).json({
                    msg: "Unauthorized"
                })
            }
            if(!payload) {
                return res.status(403).json({msg: "Payload not found"})
            }
            if(typeof payload === "string"){
                return res.status(403).json({msg: "Payload not found"})
            }

            req.headers["userId"] = payload._id;
            next();
            
        })
    }else {
        res.status(401).json({
            msg: "Header not found"
        })
    }
}

export default authenticateJwt;