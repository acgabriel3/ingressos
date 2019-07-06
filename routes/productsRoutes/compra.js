const compras = require('express').Router({
  mergeParams: true
})
const controller = require('../../controllers/produtos')

compras.get('/', controller.renderCompra)
compras.post('/', controller.realizaCompra)

module.exports = compras