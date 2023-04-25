const CustomError = require('../errors')
const User = require('../models/UserModel')

const updateProfile = async (req, res, next) => {
  const updateUser = await User.findByIdAndUpdate(
    req.params.id,
    {
      $set: req.body,
    },
    { new: true }
  )
  res.status(200).json(updateUser)
}
const changeStatus = async (req, res, next) => {
  const { email, status } = req.body
  const user = await User.findOneAndUpdate(
    { email: email },
    {
      $set: { active: status },
    },
    { new: true }
  )
  res.status(200).json({ user })
}
const deleteUser = async (req, res, next) => {
  const updateUser = await User.findByIdAndDelete(
    req.params.id,
    {
      $set: req.body,
    },
    { new: true }
  )
  res.status(200).json('User deleted')
}
const findUser = async (req, res, next) => {
  const user = await User.findById(req.params.id)
  res.status(200).json({ user })
}
const activeUser = async (req, res, next) => {
  const users = await User.find({ active: true })
  res.status(200).json({ users })
}
const getQuantity = async (req, res, next) => {
  const users = await User.find()
  res.status(200).json({ quantity: users.length })
}
const getAllUser = async (req, res, next) => {
  const users = await User.find()
  res.status(200).json({ users })
}
const blockUnblock = async (req, res, next) => {
  const user = await User.findByIdAndUpdate(
    req.params.id,
    {
      $set: { blocked: req.body.command },
    },
    { new: true }
  )
  res.status(200).json(user)
}
const getFavoriteId = async (req, res, next) => {
  const user = await User.find({ email: req.body.email })
  const favorites = user[0].favorites
  res.status(200).json({ favorites })
}
const addToFavorite = async (req, res, next) => {
  const user = await User.findOneAndUpdate(
    { email: req.body.email },
    { $push: { favorites: req.params.videoId } },
    { new: true }
  )
  res.status(200).json({ user })
}
const removeFromFavorite = async (req, res, next) => {
  const user = await User.findOneAndUpdate(
    { email: req.body.email },
    { $pull: { favorites: req.params.videoId } },
    { new: true }
  )
  res.status(200).json({ user })
}
module.exports = {
  getQuantity,
  findUser,
  deleteUser,
  updateProfile,
  activeUser,
  changeStatus,
  getAllUser,
  blockUnblock,
  getFavoriteId,
  addToFavorite,
  removeFromFavorite,
}
