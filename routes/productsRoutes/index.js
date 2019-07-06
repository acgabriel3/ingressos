const produtos = require('express').Router()
const controller = require('../../controllers/produtos')

produtos.get('/', controller.getProducts)
produtos.use('/inserir', require('./inserir'))

produtos.get('/:prodCod', controller.viewProduct)
produtos.use('/:prodCod/compra', require('./compra'))

module.exports = produtos