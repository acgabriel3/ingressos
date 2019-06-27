const logged = require('express').Router()
const path = require('path')

logged.use('/clientes', require('../clientRoutes/index'))

logged.get('/', (req, res, next) => {
  res.sendFile(path.join(__dirname, '../../../views/home.html'))
})

module.exports = logged