const express = require('express')
const logged = express.Router()
const path = require('path')
const static = path.join(__dirname + '../../../../static')

logged.use('/clientes', require('../clientRoutes/index'))

logged.get('/', (req, res, next) => {
  res.sendFile(path.join(static, 'views/home.html'))
})

module.exports = logged