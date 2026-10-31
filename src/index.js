import dotenv from 'dotenv' 

import {app} from './app.js'
import { connectDb } from './db/connectdb.js'

dotenv.config({
    path : './.env'
})

connectDb()
.then(()=>{
    app.listen(process.env.PORT || 8000 , ()=>{
        console.log(`app is running on the port : ${process.env.PORT}`)
    })
})
.catch((error)=>{
    console.log("database connection failed: ",error)
})