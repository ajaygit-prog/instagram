import mongoose from 'mongoose' 

const userSchema = new mongoose.Schema(
    {
        userName: {
            type: String ,
            required: true ,
            unique : true ,
            lowercase: true ,
            trim: true ,
            index: true
        } ,
        email: {
            type: String ,
            unique: true ,
            lowercase: true ,
            trim : true
        } ,
        password :{
            type: String ,
            required: [true , "password is required"]
            
        },
        fullName: {
            type: String ,
            required: true ,
            trim: true ,
            index: true

        } ,
        bio : {
            type: String 
        }, 
        profilePic: {
            type : String , //cloudinary
            required: true
        } ,
        isPrivate :{
            type: Boolean ,
            default: false 

        } ,

        postCount: {
            type : Number,
            default: 0 
        }


    } , {timestamps : true})



    export const User = mongoose.model("User" , userSchema) ;