const { createJWT, isTokenValid } = require('../token')
const User = require('../models/UserModel')
const Message = require('../models/MessageModel')
const CustomError = require('../errors')
const {
  sendResetLink,
  sendMessage,
} = require('../client/src/pages/admin/utils/mail')

const sendPasswordResetLink = async (req, res, next) => {
  let email = req.body.user
  const sent_to = email
  const sent_from = process.env.EMAIL_USER
  const requestedUser = await User.findOne({ email })
  if (!requestedUser) {
    throw new CustomError.BadRequestError('Sorry there is no such user')
  }
  const token = createJWT({ payload: { user: requestedUser } })
  requestedUser.resetToken = token
  try {
    await requestedUser.save()
    await sendResetLink(sent_to, sent_from, token)
  } catch (error) {
    res.status(500).json(error.message)
  }
  res.status(200).json({
    success: true,
    message: 'Reset link is sent to user email account',
  })
}
const sendReply = async (req, res, next) => {
  let { user, text } = req.body
  const sent_to = user
  const subject = 'Reply to your message'
  const sent_from = process.env.EMAIL_USER
  const message = `<p>${text}</p>`
  try {
    await sendMessage(sent_to, sent_from, subject, message)
  } catch (error) {
    res.status(500).json(error.message)
  }
  res.status(200).json({ success: true, message: 'Email sent' })
}
const resetPassword = async (req, res) => {
  const token = req.params.token
  const user = await User.findOne({ resetToken: token })
  if (!user) {
    res.status(400).json({ validToken: false, userId: null })
  }
  console.log({ user })
  res.status(200).json({ validToken: true, userId: user._id })
}
const setNewPassword = async (req, res) => {
  const user = await User.findById(req.params.id)
  user.password = req.body.newPassword
  await user.save()
  res.status(200).json({ message: 'Password changed successfully' })
}
const receiveMessage = async (req, res, next) => {
  const message = await Message.create(req.body)
  res.status(201).json({ message })
}
const getAllMail = async (req, res, next) => {
  const messages = await Message.find().sort({ createdAt: -1 })
  res.status(200).json({ messages })
}
const findMail = async (req, res, next) => {
  res.status(200).json({ msg: 'mail found' })
}
const updateMail = async (req, res, next) => {
  const { reply } = req.body
  await Message.findByIdAndUpdate(
    req.params.id,
    { $set: { reply: reply } },
    { new: true }
  )
  res.status(200).json({ msg: 'reply recorded' })
}
module.exports = {
  sendPasswordResetLink,
  sendReply,
  resetPassword,
  setNewPassword,
  getAllMail,
  findMail,
  receiveMessage,
  updateMail,
}
