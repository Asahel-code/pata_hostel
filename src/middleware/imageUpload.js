const path = require("path");
const multer = require('multer');

const cloudinary = require('cloudinary').v2;
const fs = require('fs');

cloudinary.config({
    cloud_name:process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_KEY,
    api_secret:process.env.CLOUDINARY_SECRET
});
 

const uploadToCloudinary = async (filePath) => {
    let mainFolderName = process.env.CLOUDINARY_FOLDER_NAME
    let filePathOnCloudinary = `${mainFolderName}/${path.basename(filePath)}`

    return cloudinary.uploader.upload(filePath, { "public_id": filePathOnCloudinary })
        .then(res => {
            fs.unlinkSync(filePath) // remove file from local upload folder

            return {
                message: "Success",
                url: res.url
            }
        }).catch(error => {
            fs.unlinkSync(filePath);
            throw new Error(`Failed to upload images, ${error.message}`)
        })
}

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads')
    },
    filename: function (req, file, cb) {
        cb(
            null,
            `${Math.floor(
                100000 + Math.random() * 900000
            ).toString()}`
        );
    },
})

const uploadImages = multer({ storage: storage })

module.exports = { uploadImages, uploadToCloudinary }
