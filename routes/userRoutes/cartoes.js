const cartoes = require('express').Router()
const controller = require('../../controllers/usuarios')

cartoes.get('/', controller.getCreditCards)

cartoes.get('/adicionar', controller.renderCreateCartao)
cartoes.post('/adicionar', controller.createCreditCard)

cartoes.get('/excluir', controller.renderDeleteCartao)
cartoes.post('/excluir', controller.deleteCreditCard)

module.exports = cartoes