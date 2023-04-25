const About = require('../models/AboutModel')
const CustomError = require('../errors')

const getAbout = async (req, res, next) => {
  const about = await About.findById('632ec4eb4982dbb8fedaf7d4')
  res.status(200).json({ about })
}
const updateAbout = async (req, res, next) => {
  try {
    if (req.body.image !== '') {
      req.body.profile = req.file.path
    }
    const aboutChanged = await About.findByIdAndUpdate(
      '632ec4eb4982dbb8fedaf7d4',
      { $set: req.body },
      { new: true }
    )
    res.status(200).json({ aboutChanged })
  } catch (error) {
    const aboutChanged = await About.findByIdAndUpdate(
      '632ec4eb4982dbb8fedaf7d4',
      { $set: req.body },
      { new: true }
    )
    res.status(200).json({ aboutChanged })
  }
}
module.exports = { getAbout, updateAbout }
