const multer = require('multer')
const path = require('path')
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/images')
    },
    filename: (req, file, cb) => {
        cb(null, new Date().getTime() + " - " + file.originalname)
    }
})

const fileFilter = (req, file, cb) => {
    // Allowed Extension
    const fileTypes = /jpeg|jpg|png|gif/

    // Check Extension
    const extName = fileTypes.test(path.extname(file.originalname).toLowerCase())

    // Check Mime
    const mimeType = fileTypes.test(file.mimetype)

    if(mimeType && extName){
        return cb(null, true)
    }else{
        cb("Error: Images Only !!", false)
    }
}

const uploadSingle = multer({
    storage: storage,
    limits: {
        fileSize: 1024 * 1024 * 5
    },
    fileFilter: fileFilter
})

module.exports = uploadSingle