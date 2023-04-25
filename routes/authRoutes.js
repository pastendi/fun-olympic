const express = require('express')
const router = express.Router()
const {
  adminLogin,
  userLogin,
  userRegister,
  logout,
} = require('../controllers/authController')
const { auth } = require('../middleware/authHandler')

router.route('/admin').post(adminLogin)
router.route('/login').post(userLogin)
router.route('/register').post(userRegister)
router.route('/gmail').get(logout)
router.route('/logout').get(logout)

module.exports = router
