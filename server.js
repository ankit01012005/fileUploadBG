const express = require("express")
require("dotenv").config()
const fileUpload = require("express-fileupload")
const PORT = process.env.PORT || 3000


const app = express()

app.get("/",(req ,res)=>{
    res.send("Yes babes its home page")
})

//middleware instantiating
//this is for body parser
app.use(express.json())
//this is for uploaded file parsing sinmply it uploads files on the server
app.use(fileUpload({
    useTempFiles : true,
    tempFileDir : '/tmp/'
}))

//DB connection
const DBconnect = require("./config/database")
DBconnect()

//cloudinary connection
const cloud = require("./config/cloudinary")
cloud()

// route mounting
const router = require("./routes/route")
app.use("/api/v1/upload",router)

//make server listern
app.listen(PORT,()=>{
    console.log(`server is listening at ${PORT}`)
})



