const express = require('express')
const mongoose = require('mongoose')
const config = require('config')
const corsMiddleware = require('./middleware/cors.middleware')
const authRouter = require('./routes/auth.routes')

const app = express()
const PORT = config.get('serverPort') || 5000

app.use(corsMiddleware)
app.use(express.json())
app.use('/api/auth', authRouter)

// app.use('/', (req, res) => {
//   res.json({message: 'Server started'})
// })

const start = async () => {
  try {
    await mongoose.connect(config.get('dbUrl'))

    app.listen(PORT, () => {
      console.log('Server was started at port ', PORT)
    })
  } catch (err) {
    
  }
}

start()