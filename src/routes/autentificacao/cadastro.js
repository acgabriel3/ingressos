const express = require('express')
const cadastro = express.Router()
const path = require('path')
const static = path.join(__dirname + '../../../../static')

cadastro.get('/', (req, res, next) => {
  res.sendFile(path.join(static, 'views/cadastro.html'))
})

module.exports = cadastro