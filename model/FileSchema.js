const mongoose = require("mongoose")
const nodemailer = require("nodemailer")
require("dotenv").config()
const FileSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    imageUrl:{
        type:String,
        required:true
    },
    tags:{
        type:String
    },
    email:{
        type:String,
        required:true
    }
})

FileSchema.post("save",async function (doc){
    console.log(doc)
    try{
        //nodemailer configuration
        const transpoter = nodemailer.createTransport({
             service: "gmail",
             auth:{
                user:process.env.USER_MAIL,
                pass:process.env.USER_PASS,
             }
        })

        const mailOptions = {
                    from: "Ak mandal the thudesh show",
                    to: `${doc.email}`,
                    subject: "Upload ho gya h jee image reciept pakro",
                    text: "cool broh....Cloudinary is yours",
                    html:`<h2>Uploaded Successfully.</h2> <a href="${doc.imageUrl}"> click to see ->${doc.imageUrl}</a>`
        }
        //mail sending
         await transpoter.sendMail(mailOptions,(err,info)=>{
            if(err){
                console.log(err)
                return
            }
            else{
                console.log(info)
            }
        })
        console.log("sent the mail")
    }catch(error){
        res.status(400).json({
            success:false,
            message:"node mailer fhat gya"
        })
    }





})

module.exports = mongoose.model("File",FileSchema)