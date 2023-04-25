const Carousel = require('../models/CarouselModel')
const CustomError = require('../errors')
const getAllCarousel = async (req, res, next) => {
  const result = await Carousel.find()
  res.status(200).json({ result })
}
const uploadCarousel = async (req, res, next) => {
  const result = await Carousel.findByIdAndUpdate(
    req.params.id,
    { $set: { ...req.body, image: req.file.path } },
    { new: true }
  )
  res.status(201).json({ result })
}
const deleteCarousel = async (req, res, next) => {
  const deleting = await Carousel.findByIdAndUpdate(
    req.params.id,
    { $set: { name: '', image: '' } },
    { new: true }
  )
  res.status(200).json(deleting)
}
module.exports = { getAllCarousel, uploadCarousel, deleteCarousel }
