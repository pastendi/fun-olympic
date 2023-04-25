const express = require('express')
const router = express.Router()
const auth = require('../middleware/authHandler')
const multer = require('multer')
const path = require('path')
const storage = multer.diskStorage({
  destination: 'newsPic/',
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname))
  },
})
const upload = multer({ storage: storage })
const {
  getAllNews,
  addNews,
  updateNews,
  deleteNews,
  findNews,
} = require('../controllers/newsController')

router.get('/', getAllNews)
router.post('/', upload.single('images'), addNews)
router.get('/find/:id', findNews)
router.patch('/:id', upload.single('images'), updateNews)
router.delete('/:id', deleteNews)

module.exports = router
