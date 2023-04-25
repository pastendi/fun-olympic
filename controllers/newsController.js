const News = require('../models/NewsModel')

const getAllNews = async (req, res, next) => {
  const news = await News.find().sort({ createdAt: -1 })
  res.status(200).json({ news })
}
const addNews = async (req, res, next) => {
  const result = await News.create({ ...req.body, image: req.file.path })
  res.status(201).json({ result })
}
const updateNews = async (req, res, next) => {
  try {
    if (req.body.image !== '') {
      req.body.image = req.file.path
    }
    const updatedNews = await News.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    )
    res.status(200).json(updatedNews)
  } catch (error) {
    const updatedNews = await News.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    )
    res.status(200).json(updatedNews)
  }
}
const deleteNews = async (req, res, next) => {
  await News.findByIdAndDelete(req.params.id)
  res.status(200).json('News deleted successfully')
}
const findNews = async (req, res, next) => {
  const news = await News.findById(req.params.id)
  res.status(200).json({ news })
}

module.exports = {
  getAllNews,
  addNews,
  updateNews,
  deleteNews,
  findNews,
}
