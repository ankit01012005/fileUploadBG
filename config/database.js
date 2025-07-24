const mongoose = require("mongoose")
require("dotenv").config()

const DBconnect =  ()=>{
                mongoose.connect(process.env.DATABASE_URL)
                        .then(()=>{
                        console.log("DB connection successfull")
                        })
                        .catch((error)=>{
                        console.log("DB connection Failed")
                        console.error(error)
        })      
}
module.exports = DBconnect