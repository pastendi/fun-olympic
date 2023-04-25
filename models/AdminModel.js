const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const AdminSchema = mongoose.Schema({
  username: {
    type: String,
    require: true,
  },
  password: {
    type: String,
    require: true,
    unique: true,
  },
})
AdminSchema.methods.comparePassword = async function (canditatePassword) {
  const isMatch = await bcrypt.compare(canditatePassword, this.password)
  return isMatch
}
module.exports = mongoose.model('Admin', AdminSchema)
