const express = require("express")
const router = express.Router()

const {Filehandler,imageUploader,videoUploader,imageReducer} = require("../controllers/file")
// console.log(Filehandler)
router.post("/fileUpload",Filehandler)
console.log(videoUploader)
router.post("/imageUpload",imageUploader)
router.post("/videoUpload",videoUploader)
router.post("/imageReduce",imageReducer)



module.exports = router