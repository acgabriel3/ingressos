const produtos = require('express').Router()
const controller = require('../../controllers/produtos')

produtos.get('/', controller.getProducts)
produtos.get('/compra', controller.renderCompra)
produtos.get('/:prodCod', controller.viewProduct)

module.exports = produtos