const cadastro = require('express').Router()
const controller = require('../../controllers/autentificacao')

cadastro.get('/', controller.displayRegisterPage)

module.exports = cadastro