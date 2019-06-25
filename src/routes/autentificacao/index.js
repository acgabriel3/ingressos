const autentificacao = require('express').Router()


autentificacao.use('/login', require('./login'))
autentificacao.use('/cadastro', require('./cadastro'))

module.exports = autentificacao