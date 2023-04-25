const express = require('express')
const router = express.Router()
const auth = require('../middleware/authHandler')
const multer = require('multer')
const path = require('path')
const storage = multer.diskStorage({
  destination: 'thumbnail/',
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname))
  },
})
const upload = multer({ storage: storage })
const {
  getVideoList,
  addVideo,
  updateVideo,
  deleteVideo,
  findVideo,
  addView,
  addFavorite,
  getFavorite,
  removeFavorite,
  likeVideo,
  dislikeVideo,
  search,
} = require('../controllers/videoController')
router.get('/', getVideoList)
router.get('/find/:id', findVideo)
router.post('/', upload.single('image'), addVideo)
router.patch('/:id', upload.single('image'), updateVideo)
router.delete('/:id', deleteVideo)
router.get('/view/:id', addView)
router.get('/favorite/:id', auth, addFavorite)
router.delete('/favorite/:id', auth, removeFavorite)
router.get('/favorite', auth, getFavorite)
router.get('/like/:id', auth, likeVideo)
router.get('/dislike/:id', auth, dislikeVideo)
router.get('/search', search)

module.exports = router
