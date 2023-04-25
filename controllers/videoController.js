const CustomError = require('../errors')
const Video = require('../models/VideoModel')
const User = require('../models/UserModel')

const getVideoList = async (req, res, next) => {
  const videos = await Video.find().sort({ createdAt: -1 })
  res.status(200).json({ videos })
}
const addVideo = async (req, res, next) => {
  const result = await Video.create({ ...req.body, thumbnail: req.file.path })
  res.status(201).json({ result })
}
const updateVideo = async (req, res, next) => {
  try {
    if (req.body.image !== '') {
      req.body.thumbnail = req.file.path
    }
    const updatedVideo = await Video.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    )
    res.status(200).json(updatedVideo)
  } catch (error) {
    const updatedVideo = await Video.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    )
    res.status(200).json(updatedVideo)
  }
}
const deleteVideo = async (req, res, next) => {
  const deleteVideo = await Video.findByIdAndDelete(req.params.id)
  res.status(200).json('Video deleted successfully')
}
const findVideo = async (req, res, next) => {
  const video = await Video.findById(req.params.id)
  res.status(200).json({ video })
}
const addView = async (req, res, next) => {
  await Video.findByIdAndUpdate(req.params.id, {
    $inc: { views: 1 },
  })
  res.status(200).json('Viewed')
}
const addFavorite = async (req, res, next) => {
  await User.findByIdAndUpdate(req.user.id, {
    $push: { favorites: req.params.id },
  })
  res.status(200).json('Added in favorite list')
}
const removeFavorite = async (req, res, next) => {
  await User.findByIdAndUpdate(req.user.id, {
    $pull: { favorites: req.params.id },
  })
  res.status(200).json('Removed favorite list')
}
const getFavorite = async (req, res, next) => {
  const user = await User.findById(req.user.id)
  const favList = user.favorites
  const favorites = await Promise.all(
    favList.map((videoId) => {
      return Video.findById(videoId)
    })
  )
  res.status(200).json(favorites)
}
const likeVideo = async (req, res, next) => {
  const user = await User.findByIdAndUpdate(req.user.id)
  const liked = user.likes
  const disliked = user.dislikes
  if (!liked.includes(req.params.id)) {
    await User.findByIdAndUpdate(req.user.id, {
      $push: { likes: req.params.id },
    })
    await Video.findByIdAndUpdate(req.params.id, {
      $inc: { likes: 1 },
    })
  } else {
    await User.findByIdAndUpdate(req.user.id, {
      $pull: { likes: req.params.id },
    })
    await Video.findByIdAndUpdate(req.params.id, {
      $inc: { likes: -1 },
    })
  }
  if (disliked.includes(req.params.id)) {
    await User.findByIdAndUpdate(req.user.id, {
      $pull: { dislikes: req.params.id },
    })
    await Video.findByIdAndUpdate(req.params.id, {
      $inc: { dislikes: -1 },
    })
  }
  res.status(200).json('Liked')
}
const dislikeVideo = async (req, res, next) => {
  const user = await User.findByIdAndUpdate(req.user.id)
  const disliked = user.dislikes
  const liked = user.likes
  if (!disliked.includes(req.params.id)) {
    await User.findByIdAndUpdate(req.user.id, {
      $push: { dislikes: req.params.id },
    })
    await User.findByIdAndUpdate(req.user.id, {
      $pull: { likes: req.params.id },
    })
    await Video.findByIdAndUpdate(req.params.id, {
      $inc: { dislikes: 1 },
    })
  } else {
    await User.findByIdAndUpdate(req.user.id, {
      $pull: { dislikes: req.params.id },
    })
    await Video.findByIdAndUpdate(req.params.id, {
      $inc: { dislikes: -1 },
    })
  }
  if (liked.includes(req.params.id)) {
    await User.findByIdAndUpdate(req.user.id, {
      $pull: { likes: req.params.id },
    })
    await Video.findByIdAndUpdate(req.params.id, {
      $inc: { likes: -1 },
    })
  }
  res.status(200).json('Disliked')
}
const search = async (req, res, next) => {
  const query = req.query.title
  const videos = await Video.find({ title: { $regex: query, $options: 'i' } })
  res.status(200).json({ videos })
}
module.exports = {
  getVideoList,
  addVideo,
  updateVideo,
  deleteVideo,
  findVideo,
  addView,
  addFavorite,
  removeFavorite,
  getFavorite,
  likeVideo,
  dislikeVideo,
  search,
}
