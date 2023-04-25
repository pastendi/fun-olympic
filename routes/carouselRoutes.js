const express = require('express')
const router = express.Router()
const auth = require('../middleware/authHandler')
const multer = require('multer')
const path = require('path')
const storage = multer.diskStorage({
  destination: 'carousel/',
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname))
  },
})
const upload = multer({ storage: storage })
const {
  getAllCarousel,
  uploadCarousel,
  deleteCarousel,
} = require('../controllers/carouselController')

router.get('/', getAllCarousel)
router.patch('/:id', upload.single('image'), uploadCarousel)
router.delete('/:id', deleteCarousel)

module.exports = router
