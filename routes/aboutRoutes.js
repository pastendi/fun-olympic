const express = require('express')
const router = express.Router()
const auth = require('../middleware/authHandler')
const multer = require('multer')
const path = require('path')
const storage = multer.diskStorage({
  destination: 'extra/',
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname))
  },
})
const upload = multer({ storage: storage })
const { getAbout, updateAbout } = require('../controllers/aboutController')

router.get('/', getAbout)
router.patch('/', upload.single('image'), updateAbout)
module.exports = router
