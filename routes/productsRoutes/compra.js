const compras = require('express').Router({
  mergeParams: true
})
const controller = require('../../controllers/produtos')

compras.get('/', controller.renderCompra)
compras.post('/', controller.realizaCompra, controller.realizaCompraSemDesconto)

module.exports = compras