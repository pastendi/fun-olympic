const mongoose = require('mongoose')
const aboutSchema = mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  desc: {
    type: String,
    require: true,
  },
  profile: {
    type: String,
    require: true,
  },
})

module.exports = mongoose.model('About', aboutSchema)
