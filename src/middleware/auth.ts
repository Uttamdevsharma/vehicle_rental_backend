import jwt, { JwtPayload }  from 'jsonwebtoken';
import { NextFunction, Request, Response } from "express"
import config from '../config';



const auth = (...roles: string[]) => {
    return async(req:Request,res:Response,next:NextFunction) => {

        try{
            const authHeader =  req.headers.authorization

            if(!authHeader || !authHeader.startsWith('Bearer')){
                return res.status(401).json({
                    message : "No token provided"
                })
            }

            const token = authHeader.split(' ')[1];
            const decoded = jwt.verify(token as string,config.jwt_secret as string) as JwtPayload
            req.user = decoded

            if(roles.length && !roles.includes(decoded.role)){
                return res.status(403).json({
                    message : "Forbidden : Insufficient role"
                })
            }
            next()
        }catch(err:any){
            res.status(401).json({
                success:false,
                message : err.message
            })
        }
    }
}

export default auth