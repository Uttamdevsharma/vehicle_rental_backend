import { Request, Response } from "express"
import { authService } from "./auth.service"


//register user
const registerUser = async(req:Request,res:Response) => {

    try{
        const user = await authService.registerUser(req.body)
        
        res.status(200).json({
            success : true,
            message : "User registered Successfully",
            data : {
                id:user.id,
                name:user.name,
                email : user.email,
                phone : user.phone,
                role : user.role    
            }
            
        })

    }catch(err:any){
        res.status(500).json({
            success : false,
            message : err.message,
        })
    }

}


//login user
const loginUser = async(req : Request,res:Response) => {
    

}



export const authController = {
    registerUser,
    loginUser
}