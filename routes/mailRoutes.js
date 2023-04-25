const express = require('express')
const router = express.Router()
const {
  sendPasswordResetLink,
  sendReply,
  resetPassword,
  setNewPassword,
  receiveMessage,
  getAllMail,
  findMail,
  updateMail,
} = require('../controllers/mailController')

router.post('/passwordReset', sendPasswordResetLink)
router.get('/passwordReset/:token', resetPassword)
router.post('/passwordReset/:id', setNewPassword)
router.post('/reply/', sendReply)
router.post('/', receiveMessage)
router.get('/', getAllMail)
router.get('find/:id', findMail)
router.patch('/:id', updateMail)
module.exports = router
