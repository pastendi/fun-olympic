const mongoose = require('mongoose')
const chatSchema = mongoose.Schema(
  {
    user: {
      type: String,
      required: true,
    },
    videoId: {
      type: String,
      required: true,
    },
    message: {
      type: String,
      require: true,
    },
  },
  {
    timestamps: true,
  }
)

module.exports = mongoose.model('Chat', chatSchema)
