const cloudinary = require("cloudinary").v2
require("dotenv").config()

const cloudinaryConnect = ()=>{
    try{
        cloudinary.config({
        cloud_name: process.env.CLOUD_NAME,
        api_key: process.env.API_KEY,
        api_secret: process.env.API_SECRET,
        secure: true
        });
        console.log("Cloud connection successfull")
    }catch(error){
        console.error(error)
        console.log("Cloud Connection Failed")
    }
}

module.exports = cloudinaryConnect