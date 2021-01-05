const path = require('path');
const multer = require('multer');
const { v4: uuidv4 } = require('uuid');


const uploadData = multer({
    storage: multer.diskStorage({
        destination: path.join(__dirname, '../../uploads'),
        filename: (req, file, cb) => {
            cb(null, uuidv4() + path.extname(file.originalname));
            // uuidv4() + path.extname(file.originalname)
        }
    })
});

module.exports = {
    uploadData
}