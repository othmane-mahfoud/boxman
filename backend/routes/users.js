var express = require('express')
var router  = express.Router()
var { getUsers, editUser, uploadImage } = require('../handlers/users')
const multer = require('multer');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + file.originalname);
    }
});

const fileFilter = (req, file, cb) => {
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
        cb(null, true);
    } else {
        // rejects storing a file
        cb(null, false);
    }
}

const upload = multer({
    storage: storage,
    limits: {
        fileSize: 1024 * 1024 * 5
    },
    fileFilter: fileFilter
});

router.get('/', getUsers)
router.put('/:id/edit', editUser)
router.route("/:id/uploadMulter").put(upload.single('profileImageData'), uploadImage);
router.put("/:id/uploadBase64", uploadImage);

module.exports = router
