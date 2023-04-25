const Chat = require('./../models/ChatModel')
const CustomError = require('../errors')
const addChat = async (req, res, next) => {
  const newChat = await Chat.create(req.body)
  res.status(200).json(newChat)
}
const deleteChat = async (req, res, next) => {
  const chat = await Chat.findByIdAndDelete(req.params.id)
  res.status(200).json(chat)
}
const getAllChats = async (req, res, next) => {
  const chats = await Chat.find({ videoId: req.params.videoId })
  res.status(200).json({ chats })
}
module.exports = { getAllChats, addChat, deleteChat }
