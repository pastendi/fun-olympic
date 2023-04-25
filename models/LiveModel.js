const mongoose = require('mongoose')
const liveSchema = mongoose.Schema(
  {
    title: {
      type: String,
      require: true,
    },
    url: {
      type: String,
      require: true,
    },
    thumbnail: {
      type: String,
      require: true,
    },
    desc: {
      type: String,
      require: true,
    },
  },
  {
    timestamps: true,
  }
)

module.exports = mongoose.model('Live', liveSchema)
