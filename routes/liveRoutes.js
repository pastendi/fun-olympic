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
  addLive,
  getQuantity,
  getAllLiveVideos,
  deleteLiveVideo,
  findVideo,
} = require('../controllers/liveController')
const { route } = require('express/lib/router')
router.route('/quantity').get(getQuantity)
router.route('/').post(upload.single('image'), addLive)
router.route('/').get(getAllLiveVideos)
router.route('/:id').delete(deleteLiveVideo)
router.get('/find/:id', findVideo)
module.exports = router
