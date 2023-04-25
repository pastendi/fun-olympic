const User = require('../models/UserModel')
const Admin = require('../models/AdminModel')
const { StatusCodes } = require('http-status-codes')
const CustomError = require('../errors')
const { createJWT } = require('../token')
const adminLogin = async (req, res) => {
  const { username, password } = req.body

  if (!username || !password) {
    throw new CustomError.BadRequestError(
      'Please provide username and password'
    )
  }
  const user = await Admin.findOne({ username })
  if (!user) {
    throw new CustomError.UnauthenticatedError('Invalid Credentials')
  }
  const isPasswordCorrect = await user.comparePassword(password)
  if (!isPasswordCorrect) {
    throw new CustomError.UnauthenticatedError('Invalid Credentials')
  }
  const token = createJWT({ payload: { user } })
  res.status(StatusCodes.OK).json({ user: username, token })
}
const userRegister = async (req, res) => {
  const { email, firstName } = req.body
  const emailAlreadyExists = await User.findOne({ email })
  if (emailAlreadyExists) {
    throw new CustomError.BadRequestError('Email already exists')
  }
  const user = await User.create(req.body)
  const token = createJWT({ payload: { user } })
  res.status(StatusCodes.CREATED).json({ user: firstName, token })
}

const userLogin = async (req, res) => {
  const { email, password } = req.body
  if (!email || !password) {
    throw new CustomError.BadRequestError('Please provide email and password')
  }
  const user = await User.findOne({ email })
  if (!user) {
    throw new CustomError.UnauthenticatedError('Invalid Credentials')
  }
  const isPasswordCorrect = await user.comparePassword(password)
  if (!isPasswordCorrect) {
    throw new CustomError.UnauthenticatedError('Invalid Credentials')
  }
  if (user.blocked) {
    throw new CustomError.UnauthenticatedError(
      'Sorry but you are blocked from this website'
    )
  }
  const token = createJWT({ payload: { user } })
  res.status(StatusCodes.OK).json({ user: user.firstName, token })
}

const logout = async (req, res) => {
  res.cookie('token', 'logout', {
    httpOnly: true,
    expires: new Date(Date.now() + 1000),
  })
  res.status(StatusCodes.OK).json({ user: firstName, token })
}

module.exports = { adminLogin, userLogin, userRegister, logout }
