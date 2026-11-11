import dotenv from 'dotenv' 

dotenv.config({
    path : './.env'
})
const {app} = await import("./app.js");
const {connectDb}= await import("./db/connectdb.js")

connectDb()
.then(()=>{
    app.listen(process.env.PORT || 8000 , ()=>{
        console.log(`app is running on the port : ${process.env.PORT}`)
    })
})
.catch((error)=>{
    console.log("database connection failed: ",error)
})