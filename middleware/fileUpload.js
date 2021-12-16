const multer = require('multer');
const uuid = require('uuid');
const path = require('path');

const MIME_TYPE_MAP = {
    "image/png": "png",
    "image/jpeg": "jpeg",
    "image/jpg": "jpg",

const fileUpload = multer({
    limits: 500000,
    storage: multer.diskStorage({
        destination: (req, file, callback) => {
            callback(null, "uploads/images");
        },
        filename: (req, file, callback) => {
            const extension = MIME_TYPE_MAP[file.mimetype];
            callback(null, uuid.v1() + "." + extension);
        },
    })
})
    filefilter: (req, file, callback) => {
        const isValid = !MIME_TYPE_MAP[file.mimetype];
        let error = isValid ? null : neww Error("Invalid mime type.")
    }
}
 
module.exports = fileUpload;
