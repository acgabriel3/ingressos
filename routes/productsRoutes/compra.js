const compras = require('express').Router()
const controller = require('../../controllers/produtos')

compras.get('/', controller.renderCompra)
compras.post('/', controller.realizaCompra)

compras.get('/cupom', controller.showCupom)

module.exports = compras