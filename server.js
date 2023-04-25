const dirname = require('path')
const path = require('path')
const express = require('express')
const connectDB = require('./database/connectDB')
const errorHandlerMiddleware = require('./middleware/errorHandler')
const notFoundMiddleware = require('./middleware/notFound')
const auth = require('./middleware/authHandler')
const helmet = require('helmet')
const xss = require('xss-clean')
const socket = require('socket.io')
const morgan = require('morgan')
const cors = require('cors')
require('express-async-errors')
require('dotenv').config()
const app = express()

const cookieParser = require('cookie-parser')
//routes
const authRouter = require('./routes/authRoutes')
const videoRouter = require('./routes/videoRoutes')
const carouselRouter = require('./routes/carouselRoutes')
const commentRouter = require('./routes/commentRoutes')
const chatRouter = require('./routes/chatRoutes')
const userRouter = require('./routes/userRoutes')
const mailRouter = require('./routes/mailRoutes')
const aboutRouter = require('./routes/aboutRoutes')
const liveRouter = require('./routes/liveRoutes')
const newsRouter = require('./routes/newsRoutes')

if (process.env.NODE_ENV !== 'production') {
  app.use(morgan('dev'))
}
app.use('/extra', express.static('extra'))
app.use('/thumbnail', express.static('thumbnail'))
app.use('/carousel', express.static('carousel'))
app.use('/newsPic', express.static('newsPic'))
app.use(express.static(path.resolve(__dirname, './client/build')))
app.use(express.json())
app.use(cookieParser(process.env.JWT_SECRET))

//pipeline
app.use('/api/auth', authRouter)
app.use('/api/user', userRouter)
app.use('/api/videos', videoRouter)
app.use('/api/live', liveRouter)
app.use('/api/comments', commentRouter)
app.use('/api/mail', mailRouter)
app.use('/api/carousel', carouselRouter)
app.use('/api/about', aboutRouter)
app.use('/api/news', newsRouter)
app.use('/api/chats', chatRouter)
//middleware
app.use(notFoundMiddleware)
app.use(errorHandlerMiddleware)

const port = process.env.PORT || 5000
connectDB(process.env.MONGO_URL)
const server = app.listen(
  port,
  console.log(`Server is listening at port ${port}....`)
)

const io = socket(server, {
  pingTimeout: 60000,
  cors: {
    origin: 'http://localhost:3000',
  },
})

io.on('connection', (socket) => {
  console.log('connected')
  socket.on('newChat', (newChat) => {
    io.emit('newMessage', newChat)
  })
})
