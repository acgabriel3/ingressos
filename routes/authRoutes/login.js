const login = require('express').Router()
const controller = require('../../controllers/autentificacao')

login.post('/', controller.loginHandler)

module.exports = login