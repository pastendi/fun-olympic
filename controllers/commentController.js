const CustomError = require('../errors')
const Comment = require('../models/CommentModel')
const addComment = async (req, res, next) => {
  const newComment = new Comment(req.body)
  const savedComment = await Comment.create(newComment)
  res.status(200).json(savedComment)
}
const getCommentList = async (req, res, next) => {
  const comments = await Comment.find({ videoId: req.params.videoId })
  res.status(200).json({ comments })
}
const deleteComment = async (req, res, next) => {
  const chat = await Comment.findByIdAndDelete(req.params.id)
  res.status(200).json(chat)
}
module.exports = { getCommentList, addComment, deleteComment }
