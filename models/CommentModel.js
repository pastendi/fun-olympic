const mongoose = require('mongoose')
const commentSchema = mongoose.Schema(
  {
    user: {
      type: String,
      required: true,
    },
    videoId: {
      type: String,
      required: true,
    },
    comment: {
      type: String,
      require: true,
    },
  },
  {
    timestamps: true,
  }
)

module.exports = mongoose.model('Comment', commentSchema)
