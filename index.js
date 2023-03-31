const db = require('./models')
require('dotenv').config()
const cors = require('cors')
const morgan = require('morgan')
const express = require('express')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const routers = require('./route')
const app = express()
const issue2options = {
  origin: '*',
  allowedHeaders:
    'x-access-token, Origin, X-Requested-With, Content-Type, Accept, Authorization, Content-Length,token',
  methods: ['GET', 'PUT', 'POST', 'DELETE', 'PATCH'],
  credentials: true,
}
app.use(express.urlencoded({ extended: true }))
app.use(bodyParser.urlencoded({ extended: false }))
 app.use(bodyParser.json());
app.use(express.json())
app.use(morgan('dev'))
app.use(cookieParser())
app.use(cors({ ...issue2options }))
app.use(express.static('uploads'))
app.use('/api/file', routers.fileUpload)
const startServer = async () => {
  try {
db.sequelize.sync({ force: false }).then(() => {
//db.sequelize.sync({ alter: true }).then(() => {
  app.listen(process.env.PORT, () => {
    console.log(`Server started on port ${process.env.PORT}`);
  });
    })
  } catch (err) {
    console.log(err)
    return err
  }
}
startServer()
