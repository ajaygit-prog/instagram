import {asyncHandeler} from '../utils/asyncHandeler.js'
import {User} from "../models/user.model.js"
import { apiError } from '../utils/apiError.js'
import { apiResponse } from '../utils/apiResponse.js'
import { uploadCloudinary } from '../utils/cloudinary.js'




const registerUser = asyncHandeler(async (req , res)=> {
    const {userName , email , password ,fullName , bio}= req.body

    if(
        [userName , email, password, fullName , bio]
        .some((field)=> !field || field?.trim() === "")
    ) {
        throw new apiError(400 , "all fields are required please fill all the field ")
    }

    const existedUser = await User.findOne({
        $or: [{userName} , {email}]
    }) 

    if(existedUser){
        throw new apiError(409 , "User with email or username is already exist ")
    }
    const profileLocalUrl = req.files?.profilePic[0]?.path ;

    if(!profileLocalUrl) {
        throw new apiError(400 , "profile picture is required ")
    }
    const profileUrl = await uploadCloudinary(profileLocalUrl) ;

    

    if(!profileUrl) {
        throw new apiError(400 , "upload profile pic unsuccessful ")
    }
    const user = await User.create({
        fullName ,
        profilePic: profileUrl.url ,
        email ,
        password ,
        userName : userName.toLowerCase() 
    })

    const createdUser = await User.findById(user._id).select("-password -refreshToken ")


    if(!createdUser) {
        throw new apiError(500 , " something went wrong while registering user ")
    }

    return res
    .status(200)
    .json(new apiResponse(200 , createdUser , " user registered successfully"))

})

export { registerUser ,}