const express = require('express')
const router = express.Router()
const auth = require('../middleware/authHandler')
const {
  getCommentList,
  addComment,
  deleteComment,
} = require('../controllers/CommentController')
router.route('/:videoId').get(getCommentList)
router.route('/').post(addComment)
router.route('/:id').delete(deleteComment)

module.exports = router
