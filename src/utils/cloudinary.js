import { v2 as cloudinary } from 'cloudinary' 
import fs from 'fs'


cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRETE
});



const uploadCloudinary = async(localPath) =>{
    try {
        if(!localPath) return "file not found "
        const response = await cloudinary.uploader.upload(localPath , {
            resource_type: "auto"
        })
        console.log("file uploaded on cloudinary successfully")
        fs.unlinkSync(localPath)
        return response 
    } catch (error) {
        console.log("can not upload the file on cloudinary , error is :", error)
        fs.unlinkSync(localPath)
        return null 
    }
}


export { uploadCloudinary }