const Live = require('../models/LiveModel')
const addLive = async (req, res, next) => {
  const result = await Live.create({ ...req.body, thumbnail: req.file.path })
  res.status(201).json({ result })
}
const getQuantity = async (req, res, next) => {
  const live = await Live.find()
  res.status(200).json({ quantity: live.length })
}
const getAllLiveVideos = async (req, res, next) => {
  const liveVideos = await Live.find()
  res.status(200).json({ liveVideos })
}
const deleteLiveVideo = async (req, res, next) => {
  const result = await Live.findByIdAndDelete(req.params.id)
  res.status(200).json({ result })
}
const findVideo = async (req, res, next) => {
  const video = await Live.findById(req.params.id)
  res.status(200).json({ video })
}
module.exports = {
  addLive,
  getQuantity,
  getAllLiveVideos,
  deleteLiveVideo,
  findVideo,
}
