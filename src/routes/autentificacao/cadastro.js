const cadastro = require('express').Router()
const path = require('path')

cadastro.get('/', (req, res, next) => {
  res.sendFile(path.join(__dirname, '../../../views/cadastro.html'))
})

module.exports = cadastro