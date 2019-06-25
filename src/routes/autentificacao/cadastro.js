const cadastro = require('express').Router()
const exec = require('../../controllers/autentificacao')

cadastro.get('/', exec.paginaRegistro /*, next pagina login*/)
cadastro.post('/', exec.cadastra)

module.exports = cadastro