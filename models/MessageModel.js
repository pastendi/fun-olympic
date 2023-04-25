const mongoose = require('mongoose')
const validator = require('validator')
const messageSchema = mongoose.Schema(
  {
    from: {
      type: String,
      required: true,
      validate: {
        validator: validator.isEmail,
        message: 'Please provide valid email',
      },
    },
    subject: {
      type: String,
      required: true,
    },
    message: {
      type: String,
      require: true,
    },
    reply: {
      type: String,
      default: '',
    },
  },
  {
    timestamps: true,
  }
)

module.exports = mongoose.model('Message', messageSchema)
