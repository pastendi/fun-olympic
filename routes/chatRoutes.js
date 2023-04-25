const express = require('express')
const router = express.Router()
const auth = require('../middleware/authHandler')
const {
  getAllChats,
  addChat,
  deleteChat,
} = require('../controllers/chatController')
router.route('/:videoId').get(getAllChats)
router.route('/:id').delete(deleteChat)
router.route('/').post(addChat)

module.exports = router
