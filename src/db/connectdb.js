import mongoose from "mongoose";
import {Db_Name} from '../constant.js'


const connectDb = async ()=> {
    try {
        const connectionInstance = await mongoose.connect(`${process.env.MONGODB_URI}/${Db_Name}`);
        console.log("\n mongodb connected successfully ")
    } catch (error) {
        console.log("\n mongodb connection failed .......")
        process.exit(1)
    }
}

export {connectDb}