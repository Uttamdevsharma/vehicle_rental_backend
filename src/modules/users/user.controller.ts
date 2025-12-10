import { Request, Response } from "express";
import { userService } from "./user.service";
import { JwtPayload } from "jsonwebtoken";

//get all users
const getAllUsers = async(req:Request,res:Response) => {
    try{
        const result =await userService.getAllUsers()

        res.status(200).json({
            success:true,
            message : "Users retrieved successfully",
            data: result.map((user) => ({
                id:user.id,
                name:user.name,
                email:user.email,
                phone:user.email,
                role:user.role
            }))
        })
    }catch(err:any){
        res.status(500).json({
            success:false,
            message : err.message
        })
    }

}


//update user
const updateUser = async(req:Request,res:Response) => {
    const userId = req.params.userId
    const payload = {
        ...req.body,
        id:userId
    }

    try{

        const currentUser = req.user! as JwtPayload & { id: string | number; role: string };

        if(currentUser.role == "customer" && String(currentUser.id) !== userId){
            return res.status(403).json({
                success:false,
                message : "Customers can update only their own profile"
            })
        }


        const result = await userService.updateUser(payload)

        res.status(200).json({
            success:true,
            message:"User updated successfully",
            data : {
                id:result.id,
                name:result.name,
                email:result.email,
                phone : result.phone,
                role:result.role
            }
        })

    }catch(err:any){
        res.status(500).json({
            success:false,
            message : err.message
        })
    }
    
}


//delete a user
const deleteUser = async(req:Request,res:Response) => {

    const {userId} = req.params

    const user = req.user as JwtPayload & {role:string}

    if(user.role !== "admin") {
        return res.status(403).json({
            success:false,
            message : "Only admins can delete users"
        })
    }

    const hasActiveBooking =  await userService.hasActiveBooking(userId as string)

    if(hasActiveBooking){
        return res.status(400).json({
            success:false,
            message : "user can not be deleted because they have active bookings"
        })
    }

    const deleted = await userService.deleteUser(userId as string)

    return res.status(200).json({
        success:true,
        message : "User deleted successfully"
    })
    
}

export const usersController = {
    getAllUsers,
    updateUser,
    deleteUser
}