// file handler
const File = require("../model/FileSchema")
const cloudinary = require("cloudinary").v2

exports.Filehandler = async (req ,res)=>{
    try{
        const file = req.files.file
        console.log("   File ->",file)
        //__dirname points to current directory defining the path of server
        let path = __dirname + "/files/" + Date.now() +  `.${file.name.split(".")[1]}`
        console.log("path - >",path)

        file.mv(path,(error)=>{
            console.log(error)
        })
        res.status(200).json({
            success:true,
            meesage:"File Uploaded success fully"
        })
    }catch(error){
        console.log("error in ulploading")
        console.log(error)
    }

}

function checkTypeOffile(file,availFiles){
    return availFiles.includes(file)
}

async function fileUploader(file,folder,quality){
    const options = {
        use_filename: true,
        unique_filename: false,
        overwrite: true,
        folder:folder
    }
    if(quality){
        options.quality = quality
    }


      options.resource_type = "auto"
        return  await cloudinary.uploader.upload(file.tempFilePath, options);
}

//image upload to cloudinary

exports.imageUploader = async(req ,res)=>{

   try{
        const {name,tags,email} = req.body
        console.log(name,tags,email)
    
        //fetching image file
        const file = req.files.imageFile

        //validation

        const UsertypeFile = file.name.split(".")[1].toLowerCase()
        const availableTypefiles = ["jpg","jpeg","png"]
        const checkedTypefile = checkTypeOffile(UsertypeFile,availableTypefiles)

        if(!checkedTypefile){
            return res.status(400).json({
                success:false,
                message:"File is not Supported."
            })
        }
        const responsed = await  fileUploader(file,"AnkitFirst")
        console.log("cloudinary pe upload ho gya h")


        const entry = {
            name:name,
            tags:tags,
            email:email,
            imageUrl:responsed.secure_url
        }

        const result = await File.create(entry)
        res.status(200).json({
            success:true,
            message:"Image uploaded successfully",
            responsed
        })

   }catch(error){
    res.status(400).json({
        success:false,
        message:"Something went Wrong!",
        error
    })
   }
}

//video Upload handler


exports.videoUploader = async(req ,res)=>{

   try{
        const {name,tags,email} = req.body
        console.log(name,tags,email)
    
        //fetching image file
        const file = req.files.videoFile
        console.log(file)

        //validation

        const UsertypeFile = file.name.split(".")[1].toLowerCase()
        const availableTypefiles = ["mp4","mov"]
        const checkedTypefile = checkTypeOffile(UsertypeFile,availableTypefiles)

        if(!checkedTypefile){
            return res.status(400).json({
                success:false,
                message:"File is not Supported."
            })
        }
        const responsed = await  fileUploader(file,"AnkitFirst")


        const entry = {
            name:name,
            tags:tags,
            email:email,
            imageUrl:responsed.secure_url
        }

        const result = await File.create({entry})

        res.status(200).json({
            success:true,
            message:"Video uploaded successfully",
            responsed
        })

   }catch(error){
    res.status(400).json({
        success:false,
        message:"Something went Wrong!",
        error
    })
   }
}


//image size reduacer and pload to cloudinary

exports.imageReducer = async(req ,res)=>{

   try{
        const {name,tags,email} = req.body
        console.log(name,tags,email)
    
        //fetching image file
        const file = req.files.imageFile
        console.log(file)

        //validation

        const UsertypeFile = file.name.split(".")[1].toLowerCase()
        const availableTypefiles = ["jpg","jpeg","png"]
        const checkedTypefile = checkTypeOffile(UsertypeFile,availableTypefiles)

        if(!checkedTypefile){
            return res.status(400).json({
                success:false,
                message:"File is not Supported."
            })
        }
        const responsed = await  fileUploader(file,"AnkitFirst",30)

        //enrty in DB

        const entry = {
            name:name,
            tags:tags,
            email:email,
            imageUrl:responsed.secure_url
        }

        const result = await File.create({entry})

        res.status(200).json({
            success:true,
            message:"Image uploaded and reduaced successfully",
            responsed
        })

   }catch(error){
    res.status(400).json({
        success:false,
        message:"Something went Wrong!",
        error
    })
   }
}

