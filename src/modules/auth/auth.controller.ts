import { Request, Response } from "express"
import { authService } from "./auth.service"

const registerUser = async(req:Request,res:Response) => {

    try{
        const result = await authService.registerUser(req.body) 

    }catch(err:any){
        res.status(500).json({
            success : false,
            message : err.message,
        })
    }

}
export const authController = {
    registerUser
}