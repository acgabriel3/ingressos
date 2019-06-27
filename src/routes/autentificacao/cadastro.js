const express = require('express')
const cadastro = express.Router()
const path = require('path')
const static = path.join(__dirname + '../../../../static')

var aut = require('../../controllers/autentificacao')

cadastro.get('/', (req, res, next) => {
  res.sendFile(path.join(static, 'views/cadastro.html'))
})

cadastro.post('/', aut.cadastra)

module.exports = cadastro