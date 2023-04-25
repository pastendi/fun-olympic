const express = require('express')
const { route } = require('./authRoutes')
const auth = require('../middleware/authHandler')
const {
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
} = require('../controllers/userController')
const router = express.Router()
router.get('/quantity', getQuantity)
router.get('/', getAllUser)
router.get('/active', activeUser)
router.post('/favorites', getFavoriteId)
router.patch('/block-unblock/:id', blockUnblock)
router.patch('/:id')
router.delete('/:id')
router.get('/:id', findUser)
router.patch('/change-status', changeStatus)
router.patch('/like/:videoId')
router.patch('/like/:videoId')
router.patch('/addfavorite/:videoId', addToFavorite)
router.patch('/removefavorite/:videoId', removeFromFavorite)

module.exports = router
